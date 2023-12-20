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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alert } from "@mui/material";
import { createPlant, getListPlant } from "../../api/plants";
import { Plant } from "../../types/plants";
import { PlantsSegment, PlantsType } from "./plants.constant";

//css flex box
export const PlantCreate = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);

  const [formState, setFormState] = useState<Plant>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    operationsCluster: "",
    zebra: "",
    type: "",
    nameAbbreviation: "",
    segment: "",
    active: "",
  });

  const dataQueryParent = useQuery({
    queryKey: ["plant"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListPlant(1, 1000, "", controller.signal);
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
    if (name === "zebra") {
      setFormState({ ...formState, [name]: id });
    } else {
      setFormState({
        ...formState,
        [name]: id,
        parentName: parentName as string,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formState.active = formState.active === "true" ? true : false;
    formState.zebra = formState.zebra === "true" ? true : false;
    createPlant(formState).then((data) => {
      if (data.status === 201) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      }
    });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/plants/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Create Plant</h2>
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Create successfully!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            value={formState.name}
            onChangeText={onChangeText}
            type={"text"}
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
            name="Operations Cluster"
            itemId="operationsCluster"
            value={formState.operationsCluster}
            onChangeText={onChangeText}
            type={"text"}
          />
          <SingleSelect
            name="Type"
            itemId="type"
            value={{
              id: formState.id,
              name: formState.type,
              value: formState.type,
            }}
            onChangeSelect={onChangeSingleSelect}
            options={PlantsType}
            isParent={false}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Name Abbreviation"
            itemId="nameAbbreviation"
            value={formState.nameAbbreviation}
            onChangeText={onChangeText}
            type={"text"}
          />
          <SingleSelect
            name="Segment"
            itemId="segment"
            value={{
              id: formState.id,
              name: formState.segment,
              value: formState.segment,
            }}
            onChangeSelect={onChangeSingleSelect}
            options={PlantsSegment}
            isParent={false}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Zebra"
            itemId="zebra"
            value={formState.zebra}
            onChangeText={onChangeText}
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
