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
  onChangeSelect : (name : string , id : number[]) => void;
  options : T[]
};

interface MyOptions {
  id: number;
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
  const mapName = new Map(
    props.options.map((obj) => {
      return [obj.name, obj.id];
    })
  );
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
    );

    const activeName = event.target.value as string[];
    const activeNameIds = activeName.map((name) => mapName.get(name));
    props.onChangeSelect(props.itemId, activeNameIds as number[]);
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
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={itemId}
              inputProps={{ style: textFieldStyles }}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select> */}
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.options.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.name}
                  style={getStyles(name.name, personName, theme)}
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
