import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Process } from "../../types/processes";
import { getListProcess, getProcess, updateProcess } from "../../api/processes";
import { ProcessType } from "./process.constant";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import CategoryIcon from '@mui/icons-material/Category';
//css flex box
export const ProcessEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<Process>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    type: data ? data.type : null,
    active: data ? data.active : null,
    focusField: data ? data.focusField : null,
  });
  const processId = params?.processId ?? null;

  useEffect(() => {
    if (processId) {
      getProcess(processId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          type: result.data.data.type,
          focusField: result.data.data.focusField,
          active: result.data.data.active,
        });
      });
    }
  }, [processId]);

  const dataQueryParent = useQuery({
    queryKey: ["process"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListProcess(1, 1000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeSingleSelect = (
    name: string,
    id: string,
    parentName: string
  ) => {
    setFormState({
      ...formState,
      [name]: id,
      parentName: parentName as string,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formState.active = formState.active === "true" ? true : false;
    formState.focusField = formState.focusField === "true" ? true : false;
    updateProcess(processId as string, formState)
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Process Success!", { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/processes/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Edit Process</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={2}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Processes Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            value={formState.name}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            xs={4}
            md={4}
          />
          <SingleSelect
            name="Parent"
            itemId="parentId"
            value={{
              id: formState.parentId,
              name: formState.parentName,
              value: formState.parentName,
            }}
            isParent={true}
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryParent.data?.data.data
                .map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    value: item.name,
                  };
                })
                .filter((item) => item.id !== processId) ?? []
            }
          />

          <SingleSelect
            icon = {<CategoryIcon/>}
            isParent={false}
            name="Type"
            itemId="type"
            value={{
              id: formState.id,
              name: formState.type,
              value: formState.type,
            }}
            onChangeSelect={onChangeSingleSelect}
            options={ProcessType}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Focus Field"
            itemId="focusField"
            value={formState.focusField}
            onChangeText={onChangeText}
          />
          <BooleanSelection
            icon={<ToggleOnIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
          />
        </Grid>

        <Grid container>
          <SubmitButton />
        </Grid>
      </form>
    </div>
  );
};
