import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";

import { textFieldStyles, useStyles } from "../pages/useCases/basicInformation";
export const TextComponent = (props: any)=>{
    const classes = useStyles();
    return <>
    <Grid item xs={2} md={2} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
           {props.icon}
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>User Name</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <TextField
          InputProps={{ style: textFieldStyles }}
          id="outlined-basic"
          label=""
          variant="outlined"
            className={classes.textItem}
        />
      </Grid>
    </>
}