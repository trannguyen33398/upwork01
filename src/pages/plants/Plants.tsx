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
import {PlantsSegment, PlantsType} from "./plants.constant";

//css flex box
export const Plants = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        parentId: null,
        operationsCluster: null,
        type  : null,
        nameAbbreviation : null,
        segment : null,
        zebra : null,
        active : null
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
            <h2 className={classes.headerText}>Plants</h2>
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
                        name="Operations Cluster"
                        itemId="operaionsCluster"
                        onChangeText={onChangeText}
                        icon={<AbcIcon />}
                    />
                    <SingleSelect
                        name="Type"
                        itemId="type"
                        onChangeSelect={onChangeSingleSelect}
                        options={PlantsType}
                    />
                    <SingleSelect
                        name="Segment"
                        itemId="segment"
                        onChangeSelect={onChangeSingleSelect}
                        options={PlantsSegment}
                    />
                    <BooleanSelection
                        icon={<AbcIcon />}
                        name="Zebra"
                        itemId="zebra"
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
