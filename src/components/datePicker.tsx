import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { textFieldStyles, useStyles } from "../pages/useCases/basicInformation";
export const CustomDatePicker = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={2} md={2} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <CalendarMonthIcon />
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>Date picker</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ boxShadow: textFieldStyles }}>
            <DatePicker />
          </Box>
        </LocalizationProvider>
      </Grid>
    </>
  );
};
