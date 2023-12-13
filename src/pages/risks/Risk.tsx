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

//css flex box
export const Risks = () => {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        name: null,
        parentId: null,
        priority : null,
        description : null,
        active : null
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
            <h2 className={classes.headerText}>Risks</h2>
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
                    <NumberComponent name="Priority" itemId="priority" onChangeText={onChangeNumber} icon={<NumbersIcon />}/>
                    <TextComponent
                        icon={<AbcIcon />}
                        name="Description"
                        itemId="descriptionId"
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
