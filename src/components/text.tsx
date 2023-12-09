import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { TextareaAutosize  } from '@mui/base/TextareaAutosize';
import { textFieldStyles, useStyles } from "../styles/common";

export const TextComponent = (props: any) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const text = event.target.value;

    props.onChangeText(props.itemId, text);
  };

  const classes = useStyles();
  return (
    <>
      <Grid item xs={3} md={3} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>{props.icon}</Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <TextField
          label=""
          InputProps={{ style: textFieldStyles ,inputComponent: TextareaAutosize}}
          id="outlined-basic"
          variant="outlined"
          className={classes.textItem}
          name={props.name}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};
