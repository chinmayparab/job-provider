import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PersonalForm from "./formDialogs/PersonalForm";

const PersonalDetails = ({ user, personal_details }) => {
  const [personalFormOpen, setPersonalFormOpen] = useState(false);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography component='h6' variant='h6'>
          {user && user.fname} {user && user.lname}
        </Typography>
        <Typography component='h6' variant='subtitle1'>
          {user && user.email}
        </Typography>
        <Typography component='h6' variant='subtitle1'>
          {user && user.phone_no}
        </Typography>
        {/* <Button
          variant='outlined'
          color='secondary'
          onClick={() => setPersonalFormOpen(true)}
        >
          Add Personal Details
        </Button> */}
      </Grid>
      <PersonalForm
        personalFormOpen={personalFormOpen}
        setPersonalFormOpen={setPersonalFormOpen}
        personal_details={personal_details}
      />
    </>
  );
};

export default PersonalDetails;
