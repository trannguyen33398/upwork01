import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { NumberComponent } from "../../components/Number";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { Status } from "./machine.constant";
import { useQuery } from "react-query";
import { getListMachine, getMachine, updateMachine } from "../../api/machines";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Machine } from "../../types/machines";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
//css flex box
export const MachineEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<Machine>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    priority: data ? data.priority : null,
    description: data ? data.description : null,
    active: data ? data.active : null,
    status: data ? data.status : null,
  });
  const machineId = params?.machineId ?? null;

  useEffect(() => {
    if (machineId) {
      getMachine(machineId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          priority: result.data.data.priority,
          description: result.data.data.description,
          active: result.data.data.active,
          status: result.data.data.status,
        });
      });
    }
  }, [machineId]);

  const dataQueryParent = useQuery({
    queryKey: ["machine"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListMachine(1, 1000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeNumber = (name: string, number: number) => {
    setFormState({ ...formState, [name]: number });
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
    updateMachine(machineId as string, formState)
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Machine Success!", { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/machines/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Machines</h2>
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
              dataQueryParent.data?.data.data
                .map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    value: item.name,
                  };
                })
                .filter((item) => item.id !== machineId) ?? []
            }
          />
          <NumberComponent
            name="Priority"
            itemId="priority"
            value={formState.priority}
            onChangeText={onChangeNumber}
            icon={<NumbersIcon />}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={false}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
          />
          <SingleSelect
          isParent={false}
            name="Status"
            itemId="status"
            value={{
              id: formState.id,
              name: formState.status,
              value: formState.status,
            }}
            onChangeSelect={onChangeSingleSelect}
            options={Status}
          />
        </Grid>

        <Grid container>
          <SubmitButton />
        </Grid>
      </form>
    </div>
  );
};
