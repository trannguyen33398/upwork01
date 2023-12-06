import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import AbcIcon from "@mui/icons-material/Abc";
import { SelectComponent } from "../../components/select";
import { CustomDatePicker } from "../../components/datePicker";
import { TextComponent } from "../../components/text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export const useStyles = makeStyles({
  gridItem: {
    alignItems: "flex-start",
    display: "flex",
  },
  textItem: {
    width: 350,
    
  },
  headerText: {
    textAlign: "left"
  },
  div: {
    margin: 40
  }
});

export const textFieldStyles = {
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)", // Customize the shadow here
};
//css flex box
export const BasicInformation = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div  className={classes.div}>
    <h2  className={classes.headerText}>Basic Information</h2>
    <Grid container spacing={2} >
    <TextComponent icon = {<AbcIcon/>}/>
     <SelectComponent/>
     <CustomDatePicker/>
     <TextComponent icon = {<CheckCircleOutlineIcon/>}/>
     <TextComponent icon = {<CheckCircleOutlineIcon/>}/>
     <TextComponent icon = {<CheckCircleOutlineIcon/>}/>
     <TextComponent icon = {<CheckCircleOutlineIcon/>}/> 
     
    </Grid>
    <br/> <br/> <hr/> 
    <h2  className={classes.headerText}>Process Information</h2>

    <Grid container spacing={2} >
  
    <TextComponent icon = {<CheckCircleOutlineIcon/>}/>
     <TextComponent icon = {<CheckCircleOutlineIcon/>}/>
      </Grid>
    </div>
  );
};
