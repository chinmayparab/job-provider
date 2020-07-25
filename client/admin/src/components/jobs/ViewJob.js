import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TypoGraphy from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { AuthContext } from '../../context/authContext/authContext'

import { getJobs } from './functions'

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(3)
	}
}))

const ViewJob = () => {
	const classes = useStyles()
	const { authToken } = useContext(AuthContext)

	const [jobs, setJobs] = useState([])

	useEffect(() => {
		getJobs(authToken).then((res) => setJobs(res.alljobs))
	}, [])
	console.log(jobs[0])

	return (
		<Container>
			<TypoGraphy gutterBottom={true} variant='h5'>
				View added Jobs
			</TypoGraphy>
			<Container maxWidth='md'>
				{jobs && jobs.length > 0 ? (
					jobs.map((job, index) => (
						<Box my={3} key={index}>
							<Paper className={classes.card}>
								<Grid container spacing={3}>
									<Grid item sm={6}>
										<TypoGraphy variant='subtitle2'>Job Title</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.pos_names}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Stipend</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.stipend}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Qualification</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.qualification}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>
											No. of Positions
										</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.no_positions}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Closing Date</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.closing_date}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Interview Date</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.date_time_interview}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>
											Interview Location
										</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.interview_loc}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Interview Mode</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.interview_mode}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Online Test</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.is_online_test}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>Posted On</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.posted_on}
										</TypoGraphy>
										<TypoGraphy variant='subtitle2'>
											Extra Information
										</TypoGraphy>
										<TypoGraphy gutterBottom variant='body1'>
											{job.extra_info}
										</TypoGraphy>
									</Grid>
									<Grid item sm={6}>
										<TypoGraphy variant='subtitle2'>Job Description</TypoGraphy>
										<TypoGraphy variant='body1'>{job.description}</TypoGraphy>
									</Grid>
								</Grid>
							</Paper>
						</Box>
					))
				) : (
					<TypoGraphy variant='subtitle2'>No jobs added</TypoGraphy>
				)}
			</Container>
		</Container>
	)
}

export default ViewJob
