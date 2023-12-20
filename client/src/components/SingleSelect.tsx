import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { InputLabel, OutlinedInput, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { textFieldStyles, useStyles } from "../styles/common";
import { useState, useEffect } from "react";

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
  itemId: string;
  onChangeSelect: (name: string, id: string, parentName?: string) => void;
  options: T[];
  value: {
    id: string | null;
    name: string | null;
    value: string | null;
  };
  isParent?: boolean;
};

interface MyOptions {
  id: string;
  value: string;
  name: string;
}

export const SingleSelect: React.FC<TSelectProp<MyOptions>> = ({
  isParent = false,
  ...props
}) => {
  const listKey = {} as any;
  // eslint-disable-next-line array-callback-return
  props.options.map((item) => {
    Object.assign(listKey, {
      [item.name]: item.id,
    });
  });
  const [value, setValue] = useState<string>(props.value.name ?? "");
  useEffect(() => {
    if (props.value.name) setValue(props.value.name);
  }, [props.value, props.value.name]);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);

    const activeNameId = listKey[event.target.value];

    if (!isParent) {
      props.onChangeSelect(props.itemId, event.target.value);
    } else {
      props.onChangeSelect(props.itemId, activeNameId, event.target.value);
    }
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
              value={value}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
            >
              {props.options.map((name) => (
                <MenuItem key={name.id} value={name.name}>
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
