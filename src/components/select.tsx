import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { textFieldStyles, useStyles } from "../pages/useCases/basicInformation";

export const SelectComponent = (prop: any) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <Grid item xs={2} md={2} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <CompareArrowsIcon />
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>Select</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <Box sx={{ boxShadow: textFieldStyles }}>
          <FormControl sx={{ xs: 2, md: 2, minWidth: 250 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              inputProps={{ style: textFieldStyles }}
              onChange={handleChange}
              className={classes.textItem}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};
