import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { textFieldStyles, useStyles } from "../styles/common";

export const CustomDatePicker = (props: any) => {
  const classes = useStyles();
  const handleChange = (event: any) => {
    props.onChangeText(props.itemId, event["$d"].toISOString());
  };
  return (
    <>
      <Grid item xs={3} md={3} direction="column" className={classes.gridItem}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <CalendarMonthIcon />
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ boxShadow: textFieldStyles, width: "70%" }}>
            <DatePicker
              onChange={handleChange}
              className={classes.datePicker}
            />
          </Box>
        </LocalizationProvider>
      </Grid>
    </>
  );
};
