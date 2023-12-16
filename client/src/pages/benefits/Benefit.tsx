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
import {BenefitType, ReliabilityType} from "./benefit.constant";
import {DefaultOption} from "../../common/common.constant";
import {SingleSelect} from "../../components/SingleSelect";
import {FloatNumber} from "../../components/FloatNumber";

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
        sprintStatus : null,
        calculationInput : null,
        savings : null,
        comment : null,
        reliability : null
    });
    const onChangeText = (name: string, text: string ) => {
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
                        itemId="type"
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
                        itemId="sprintStatus"
                        onChangeText={onChangeText}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Calculation Input"
                        itemId="calculationInput"
                        onChangeText={onChangeText}
                    />
                    <FloatNumber
                        icon={<AbcIcon />}
                        type="number"
                        name="Savings"
                        itemId="savings"
                        onChangeText={onChangeSingleSelect}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Comment"
                        itemId="comment"
                        onChangeText={onChangeText}
                    />
                    <SingleSelect
                        name="Reliability"
                        itemId="reliabilityId"
                        onChangeSelect={onChangeSingleSelect}
                        options={ReliabilityType}
                    />
                </Grid>


                <Grid container>
                    <SubmitButton />
                </Grid>
            </form>
        </div>
    );
};