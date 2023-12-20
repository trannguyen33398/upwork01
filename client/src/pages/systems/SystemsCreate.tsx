import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { useQuery } from "react-query";
import { createSystem, getListSystem } from "../../api/systems";
import { System } from "../../types/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";

//css flex box
export const SystemCreate = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState<System>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    description: "",
    category: "",
    active: "true",
    toolName: "",
  });

  const dataQueryParent = useQuery({
    queryKey: ["system"],
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
    createSystem(formState)
      .then((data) => {
        if (data.status === 201) {
        }
        navigate("/systems/all");
        enqueueSnackbar("Create System Success!", {
          variant: "success",
        });
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
            isParent={true}
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryParent.data?.data.data.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  value: item.name,
                };
              }) ?? []
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
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
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
        </Grid>

        <Grid container>
          <SubmitButton />
        </Grid>
      </form>
    </div>
  );
};
