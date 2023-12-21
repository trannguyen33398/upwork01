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
import { getListSystem, getSystem, updateSystem } from "../../api/systems";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { System } from "../../types/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
//css flex box
export const SystemEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<System>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,

    description: data ? data.description : null,
    category: data ? data.category : null,
    toolName: data ? data.toolName : null,
    active: data ? data.active : null,
  });
  const systemId = params?.systemId ?? null;
  useEffect(() => {
    if (systemId) {
      getSystem(systemId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          description: result.data.data.description,
          category: result.data.data.category,
          active: result.data.data.active,
          toolName: result.data.data.toolName,
        });
      });
    }
  }, [systemId]);

  const dataQueryParent = useQuery({
    queryKey: ["System"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListSystem(1, 1000, "", controller.signal);
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
    updateSystem(systemId as string, formState)
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit System Success!", { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/systems/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Systems</h2>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            value={formState.name}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <SingleSelect
            name="Parent"
            itemId="parentId"
            value={{
              id: formState.parentId,
              name: formState.parentName,
              value: formState.parentName,
            }}
            onChangeSelect={onChangeSingleSelect}
            isParent={true}
            options={
              dataQueryParent.data?.data.data
                .map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    value: item.name,
                  };
                })
                .filter((item) => item.id !== systemId) ?? []
            }
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Category"
            itemId="category"
            value={formState.category}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Tool Name"
            itemId="toolName"
            value={formState.toolName}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />

          <BooleanSelection
            icon={<AbcIcon />}
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
