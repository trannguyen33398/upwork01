import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import {
  createCommunicationStream,
  getListCommunicationStream,
} from "../../api/communication-streams";
import { CommunicationStream } from "../../types/communication-streams";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";

//css flex box
export const CommunicationStreamCreate = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState<CommunicationStream>({
    id: "",
    name: "",
    description: "",
    responsiblePerson: "",
    active: "true",
  });

  const dataQueryParent = useQuery({
    queryKey: ["CommunicationStream"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListCommunicationStream(1, 1000, "", controller.signal);
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
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formState.active = formState.active === "true" ? true : false;
    createCommunicationStream(formState)
      .then((data) => {
        if (data.status === 201) {
          navigate("/communication-streams/all");
          enqueueSnackbar("Create Communication Stream Success!", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/communication-streams/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>CommunicationStreams</h2>

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
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            value={formState.responsiblePerson}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
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
