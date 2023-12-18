import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";

//css flex box
export const CommunicationStreams = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        description : null,
        responsiblePerson : null,
        active : null
    });
    const onChangeText = (name: string, text: string ) => {
        setFormState({ ...formState, [name]: text });
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Communication Streams</h2>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Name"
                        itemId="name"
                        onChangeText={onChangeText} type={"text"} value={""}                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Description"
                        itemId="description"
                        onChangeText={onChangeText} type={"text"} value={""}                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Responsible Person"
                        itemId="responsiblePerson"
                        onChangeText={onChangeText} type={"text"} value={""}                    />
                    <BooleanSelection
                        icon={<AbcIcon />}
                        name="Active"
                        itemId="active"
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
