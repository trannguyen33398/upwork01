import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, InputLabel, OutlinedInput, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { textFieldStyles, useStyles } from "../styles/common";
import { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TSelectProp<T> = {
  name: string;
  itemId : string;
  onChangeSelect : (name : string , id : string[]) => void;
  options : T[],
   value?: {
    id: string | null;
    name: string[] | null;
    value: string[] | null;
  };
};

interface MyOptions {
  id: string;
  value: string;
  name : string;
}



function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const MultipleSelect : React.FC<TSelectProp<MyOptions>>  = (props) => {
  const [value, setValue] = useState<string[]>(props?.value?.name ?? [""]);
  React.useEffect(() => {
    if (props?.value?.name) setValue(props.value.name);
  }, [props.value, props?.value?.name]);
 const key  = {} as any
    props.options.map((obj) => {
      Object.assign(key,{  [obj.name]: obj.id})
    })
  
  const theme = useTheme();
 

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    setValue(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
    );
    
    const activeName = event.target.value as string[];
   // const activeNameIds = activeName.map((name) => key[name]);
    props.onChangeSelect(props.itemId, activeName);
  };

  const classes = useStyles();
  return (
    <>
      <Grid item xs={3} md={3} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <CompareArrowsIcon />
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <Box sx={{ boxShadow: textFieldStyles, width: "70%" }}>
          <FormControl sx={{ width: "100%" }}>
      
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={value}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    value !== "" ? 
                    <Chip key={value} label={value} /> : null
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.options.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.name}
                  style={getStyles(name.name, value, theme)}
                >
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};
