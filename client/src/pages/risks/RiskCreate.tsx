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
import { useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";

import { useQuery } from "react-query";
import { createRisk, getListRisk } from "../../api/risks";
import { Risk } from "../../types/risks";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Alert } from "@mui/material";

//css flex box
export const RiskCreate = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);

  const [formState, setFormState] = useState<Risk>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    priority: 1,
    description: "",
    active: "true",
  });

  const dataQueryParent = useQuery({
    queryKey: ["Risk"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListRisk(1, 1000, "", controller.signal);
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
    createRisk(formState).then((data) => {
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
    navigate("/risks/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Risks</h2>
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