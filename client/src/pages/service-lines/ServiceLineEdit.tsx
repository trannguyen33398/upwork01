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
import { ServiceLine } from "../../types/service-lines";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import {
  getListServiceLine,
  getServiceLine,
  updateServiceLine,
} from "../../api/service-lines";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
//css flex box
export const ServiceLineEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<ServiceLine>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    description: data ? data.description : null,
    responsiblePerson: data ? data.responsiblePerson : null,
    active: data ? data.active : null,
  });
  const serviceLineId = params?.serviceLineId ?? null;
  useEffect(() => {
    if (serviceLineId) {
      getServiceLine(serviceLineId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          description: result.data.data.description,
          responsiblePerson: result.data.data.responsiblePerson,
          active: result.data.data.active,
        });
      });
    }
  }, [serviceLineId]);

  const dataQueryParent = useQuery({
    queryKey: ["service-line"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListServiceLine(1, 1000, "", controller.signal);
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
    parentName?: string
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
    updateServiceLine(serviceLineId as string, formState)
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Service Line Success!", { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/service-lines/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Edit Service Line</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Service Information
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
                .filter((item) => item.id !== serviceLineId) ?? []
            }
          />
          <BooleanSelection
            icon={<ToggleOnIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
          />
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Detail Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            value={formState.responsiblePerson}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <Grid item xs={12} md={12}>
            <span></span>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            xs={7}
            md={7}
          />
        </Grid>

        <Grid container>
          <SubmitButton />
        </Grid>
      </form>
    </div>
  );
};
