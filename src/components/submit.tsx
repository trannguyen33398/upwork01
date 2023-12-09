import { Button, Grid } from "@mui/material";
import {  useStyles } from "../styles/common";

export const SubmitButton = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        xs={3}
        md={3}
    
        className={classes.gridItem}
        direction="column"
      >
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Grid>
    </>
  );
};
