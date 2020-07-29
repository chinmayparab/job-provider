import React, { useContext } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { JobsContext } from "../../context/jobs/JobsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(2, 0),
    boxShadow: "0 8px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  rad: {
    minWidth: 275,
    margin: theme.spacing(2, 0),
    border: `2px solid #7289DA`,
    boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const JobCards = ({ job }) => {
  const classes = useStyles();
  const {
    stipend,
    pos_names,
    qualification,
    no_postions,
    interview_mode,
    interveiw_loc,
  } = job;

  const { current, setCurrent } = useContext(JobsContext);

  return (
    <Card
      className={current === job ? classes.rad : classes.root}
      variant='outlined'
      onClick={() => setCurrent(job)}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {interview_mode}
        </Typography>
        <Typography variant='h5' component='h2'>
          {pos_names}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {stipend}
        </Typography>
        <Typography variant='body2' component='p'>
          {qualification}
          <br />
          Number of Openings: {no_postions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default JobCards;
