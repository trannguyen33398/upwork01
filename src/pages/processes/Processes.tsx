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
import {DefaultOption} from '../../common/common.constant'
import {SingleSelect} from "../../components/SingleSelect";
import {ProcessType} from "./process.constant";
//css flex box
export const Processes = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        parentId: null,
        type: null,
        focusField: null,
        active: null,
    });
    const onChangeText = (name: string, text: string | number) => {
        setFormState({ ...formState, [name]: text });
    };

    const onChangeMultipleSelect = (name : string , id : number[]) => {
        setFormState({...formState , [name] : id})
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    };

    const onChangeSingleSelect = (name : string , id : number) => {
        setFormState({...formState , [name] : id})
    }

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Processes</h2>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Name"
                        itemId="name"
                        onChangeText={onChangeText}
                    />
                    <MultipleSelect
                        name="Parent Id"
                        itemId="parentId"
                        onChangeSelect={onChangeMultipleSelect}
                        options={DefaultOption}
                    />
                    <SingleSelect
                        name="Type"
                        itemId="type"
                        onChangeSelect={onChangeSingleSelect}
                        options={ProcessType}
                    />
                    <BooleanSelection
                        icon={<AbcIcon />}
                        name="Focus Field"
                        itemId="focusField"
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
