import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    height: "100%",
  },
}));

const CourseCard = ({ title, price, category, description, skills, level }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card}>
      <Typography noWrap variant='h6'>
        {title}
      </Typography>
      <Typography noWrap gutterBottom variant='subtitle2'>
        {level}
      </Typography>
      <Typography gutterBottom noWrap variant='subtitle2'>
        Rs. {price}
      </Typography>
      <Chip label={category} />
      <Box my={3}>{description}</Box>
      <Typography variant='subtitle1'>{skills}</Typography>
    </Paper>
  );
};
export default CourseCard;
