import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { AuthContext } from "../../context/auth/AuthContext";
import { JobsContext } from "../../context/jobs/JobsContext";
import { AlertContext } from "../../context/alert/AlertContext";

import JobDetailsDialog from "./JobDetailsDialog";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    height: "100%",
  },
  buttons: {
    marginTop: theme.spacing(3),
  },
}));

const JobCard = ({ job }) => {
  const classes = useStyles();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { authToken } = useContext(AuthContext);
  const { setCurrent } = useContext(JobsContext);

  const { t } = useTranslation();

  const handleDetailsOpen = () => {
    setCurrent(job);
    setDetailsOpen(true);
  };

  return (
    <>
      <Paper className={classes.card}>
        <Box>
          <Typography noWrap variant='h6'>
            {job.pos_names}
          </Typography>
        </Box>
        <Box>
          <Tooltip title={job.description} placement='bottom' arrow>
            <Typography noWrap variant='body2'>
              {job.description}
            </Typography>
          </Tooltip>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography noWrap variant='subtitle2'>
                {t("No. of positions")}
              </Typography>
              <Typography noWrap variant='body2'>
                {job.no_postions}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography noWrap variant='subtitle2'>
                {t("Stipend")}
              </Typography>
              <Typography noWrap variant='body2'>
                {job.stipend}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography noWrap variant='subtitle2'>
                {t("Closing Date")}
              </Typography>
              <Typography noWrap variant='body2'>
                {new Date(job.closing_date).toLocaleDateString("en-GB")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography noWrap variant='subtitle2'>
                {t("Interview Date")}
              </Typography>
              <Typography noWrap variant='body2'>
                {new Date(job.date_time_interview).toLocaleDateString("en-GB")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid className={classes.buttons} container spacing={2}>
          <Grid style={{ textAlign: "center" }} item xs={12}>
            <Button
              onClick={handleDetailsOpen}
              color='primary'
              variant='outlined'
            >
              {t("View")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <JobDetailsDialog
        job={job}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
    </>
  );
};

export default JobCard;
