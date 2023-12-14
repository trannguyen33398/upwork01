import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { CustomDatePicker } from "../../components/DatePicker";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import {DefaultOption} from "../../common/common.constant";
import {SingleSelect} from "../../components/SingleSelect";
import {FloatNumber} from "../../components/FloatNumber";

//css flex box
export const ServiceLines = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        parentId: null,
        description : null,
        responsiblePerson : null,
        active : null
    });
    const onChangeText = (name: string, text: string ) => {
        setFormState({ ...formState, [name]: text });
    };

    const onChangeSelect = (name : string , id : number[]) => {
        setFormState({...formState , [name] : id})
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Service Lines</h2>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Name"
                        itemId="name"
                        onChangeText={onChangeText}
                    />
                    <MultipleSelect
                        name="Parent"
                        itemId="parentId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Description"
                        itemId="description"
                        onChangeText={onChangeText}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Responsible Person"
                        itemId="responsiblePerson"
                        onChangeText={onChangeText}
                    />
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
