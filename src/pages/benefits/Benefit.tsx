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
import {BenefitType} from "./benefit.constant";
import {DefaultOption} from "../../common/common.constant";
import {SingleSelect} from "../../components/SingleSelect";

//css flex box
export const Benefit = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        parentId: null,
        useCaseId: null,
        type: null,
        categoryId : null,
        sprintId : null,
        sprintStatusId : null,
        calculationInputId : null
    });
    const onChangeText = (name: string, text: string) => {
        setFormState({ ...formState, [name]: text });
    };

    const onChangeSelect = (name : string , id : number[]) => {
        setFormState({...formState , [name] : id})
    }

    const onChangeSingleSelect = (name : string , id : number) => {
        setFormState({...formState , [name] : id})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Benefit</h2>
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
                    <MultipleSelect
                        name="Use Case Parent"
                        itemId="useCaseId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />
                    <SingleSelect
                        name="Type"
                        itemId="systemId"
                        onChangeSelect={onChangeSingleSelect}
                        options={BenefitType}
                    />

                    <MultipleSelect
                        name="Category"
                        itemId="categoryId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />

                    <TextComponent
                        icon={<AbcIcon />}
                        name="Sprint"
                        itemId="sprintId"
                        onChangeText={onChangeText}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Sprint Status"
                        itemId="sprintStatusId"
                        onChangeText={onChangeText}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Calculation Input"
                        itemId="calculationInputId"
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
