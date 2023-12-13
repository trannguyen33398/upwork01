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
import NumberInput from "@mui/material/TextField";
import {NumberComponent} from "../../components/Number";
import NumbersIcon from '@mui/icons-material/Numbers';
import {StatusType} from "./sprint.constant";

//css flex box
export const Sprints = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        useCaseId: null,
        bundlesId : null,
        plannedFrom : null,
        plannedTo : null,
        step : null,
        description : null,
        status : null,
        developmentStatus : null,
        iterationStatus: null,
        implementationStatus : null,
        handoverStatus : null,
        implementedAt : null,
        documents : null
    });
    const onChangeText = (name: string, text: string) => {
        setFormState({ ...formState, [name]: text });
    };

    const onChangeSelect = (name : string , id : number[]) => {
        setFormState({...formState , [name] : id})
    }

    const onChangeNumber = (name : string , number : number) => {
        setFormState({...formState , [name] : number})
    }

    const onChangeSingleSelect = (name : string , id : number) => {
        setFormState({...formState , [name] : id})
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (

        <div className={classes.div}>
            <h2 className={classes.headerText}>Sprints</h2>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={1}>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Name"
                        itemId="name"
                        onChangeText={onChangeText}
                    />
                    <MultipleSelect
                        name="Use Case Parent"
                        itemId="useCaseId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />
                    <MultipleSelect
                        name="Bundles"
                        itemId="bundlesId"
                        onChangeSelect={onChangeSelect}
                        options={DefaultOption}
                    />

                    <CustomDatePicker
                        name="Planned From"
                        itemId="plannedFrom"
                        onChangeText={onChangeText}
                    />
                    <CustomDatePicker
                        name="Planned To"
                        itemId="plannedTo"
                        onChangeText={onChangeText}
                    />
                    <NumberComponent name="Step" itemId="stepId" onChangeText={onChangeNumber} icon={<NumbersIcon />}/>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Description"
                        itemId="description"
                        onChangeText={onChangeText}
                    />
                    <SingleSelect name="Status" itemId="statusId" onChangeSelect={onChangeSingleSelect} options={StatusType} />
                    <SingleSelect name="Development Status" itemId="developmentStatusId" onChangeSelect={onChangeSingleSelect} options={StatusType} />
                    <SingleSelect name="Iteration Status" itemId="iterationStatusId" onChangeSelect={onChangeSingleSelect} options={StatusType} />
                    <SingleSelect name="Implementation Status" itemId="implementationStatusId" onChangeSelect={onChangeSingleSelect} options={StatusType} />
                    <SingleSelect name="Handover Status" itemId="handoverStatusId" onChangeSelect={onChangeSingleSelect} options={StatusType} />
                    <CustomDatePicker
                        name="Implemented At"
                        itemId="implementedAt"
                        onChangeText={onChangeText}
                    />
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Documents"
                        itemId="documents"
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
