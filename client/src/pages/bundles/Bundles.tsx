import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { useStyles } from "../../styles/common";
import { DefaultOption } from "../../common/common.constant";

//css flex box
export const Bundles = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        useCaseId: null,
        description : null
    });
    const onChangeText = (name: string, text: string) => {
        setFormState({ ...formState, [name]: text });
    };

    const onChangeSelect = (name : string , id : string[]) => {
        setFormState({...formState , [name] : id})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Bundles</h2>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Name"
                        itemId="name"
                        onChangeText={onChangeText} type={"text"} value={""}                    />
                    <MultipleSelect
                        name="Use Case Parent"
                        itemId="useCaseId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />

                    <TextComponent
                        icon={<AbcIcon />}
                        name="Description"
                        itemId="description"
                        onChangeText={onChangeText} type={"text"} value={""}                    />
                </Grid>

                <Grid container>
                    <SubmitButton />
                </Grid>
            </form>
        </div>
    );
};
