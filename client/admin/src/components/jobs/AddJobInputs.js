import React, { useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TypoGraphy from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { AuthContext } from '../../context/authContext/authContext'
import { JobContext } from '../../context/jobContext/jobContext'
import { SnackContext } from '../../context/snackContext/snackContext'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
	paper: {
		paddingBottom: '20px'
	},
	copyPaper: {
		height: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(2)
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: theme.spacing(4)
		},
		padding: theme.spacing(1),
		maxHeight: '60vh',
		overflowY: 'scroll'
	}
}))

const AddJobInputs = ({ renderVar, totalJobs, prevJob, nextJob, job }) => {
	const classes = useStyles()

	const { authToken } = useContext(AuthContext)
	const { addJob } = useContext(JobContext)
	const { showSnack } = useContext(SnackContext)

	const { t } = useTranslation()

	const [jobDetails, setJobDetails] = useState({
		jobtitle: job ? job.NameOfPosition : '',
		description: job ? job.Description : '',
		vacancies: job ? parseInt(job.NumberOfPosition) || 0 : 0,
		stipend: job ? parseInt(job.Stipend) || 0 : 0,
		qualification: '',
		closing_date: new Date().getTime(),
		datetime_interview: new Date().getTime(),
		extra_info: job ? job.Links : '',
		interview_mode: '',
		interview_location: '',
		is_onlinetest: ''
	})

	const handleAddJob = () => {
		addJob(authToken, jobDetails).then((res) => {
			if (res) {
				showSnack('New job added')
			} else {
				showSnack('Something went wrong. Try again')
			}
		})
	}

	return (
		<>
			<Paper className={classes.paper}>
				<Box p={2}>
					<TypoGraphy color='textSecondary' variant='subtitle2'>
						{job
							? `${t('Edit scanned job')}(${renderVar + 1}/${totalJobs})`
							: t('Manually Add Job')}
					</TypoGraphy>
				</Box>
				<Container maxWidth='md'>
					<TextField
						required
						margin='dense'
						label={t('Job Title')}
						fullWidth
						value={jobDetails.jobtitle}
						onChange={(e) =>
							setJobDetails({ ...jobDetails, jobtitle: e.target.value })
						}
					/>
					<TextField
						required
						margin='dense'
						label={t('Job Description')}
						multiline
						rowsMax={10}
						helperText={t('Maximum 1000 characters')}
						fullWidth
						value={jobDetails.description}
						onChange={(e) =>
							setJobDetails({
								...jobDetails,
								description: e.target.value
							})
						}
					/>
					<Grid container spacing={3}>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Total Vacancies')}
								type='number'
								fullWidth
								value={jobDetails.vacancies}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										vacancies: e.target.value
									})
								}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Stipend')}
								type='number'
								fullWidth
								value={jobDetails.stipend}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										stipend: e.target.value
									})
								}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Qualification')}
								fullWidth
								value={jobDetails.qualification}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										qualification: e.target.value
									})
								}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Interview Mode')}
								fullWidth
								value={jobDetails.interview_mode}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										interview_mode: e.target.value
									})
								}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item sm={6} xs={12}>
							<KeyboardDateTimePicker
								required
								margin='dense'
								label={t('Closing Date')}
								animateYearScrolling
								fullWidth
								disablePast
								value={jobDetails.closing_date}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										closing_date: e
									})
								}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<KeyboardDateTimePicker
								required
								margin='dense'
								label={t('InterView Date')}
								animateYearScrolling
								fullWidth
								disablePast
								value={jobDetails.datetime_interview}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										datetime_interview: e
									})
								}
							/>
						</Grid>
					</Grid>
					<TextField
						required
						margin='dense'
						label={t('Extra Information')}
						fullWidth
						multiline
						rowsMax={3}
						value={jobDetails.extra_info}
						onChange={(e) =>
							setJobDetails({ ...jobDetails, extra_info: e.target.value })
						}
					/>
					<Grid container spacing={3}>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Job Location')}
								fullWidth
								value={jobDetails.interview_location}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										interview_location: e.target.value
									})
								}
							/>
						</Grid>
						<Grid item sm={6} xs={12}>
							<TextField
								required
								margin='dense'
								label={t('Online Test')}
								fullWidth
								value={jobDetails.is_onlinetest}
								onChange={(e) =>
									setJobDetails({
										...jobDetails,
										is_onlinetest: e.target.value
									})
								}
							/>
						</Grid>
					</Grid>
					<Box mt={3} align='right'>
						{totalJobs > 1 ? (
							<Button
								style={{ marginRight: '10px' }}
								color='primary'
								onClick={prevJob}
								variant='contained'
							>
								<ChevronLeftIcon />
							</Button>
						) : null}

						<Button
							color='secondary'
							onClick={handleAddJob}
							variant='contained'
						>
							{t('Add Job')}
						</Button>
						{totalJobs > 1 ? (
							<Button
								style={{ marginLeft: '10px' }}
								color='primary'
								onClick={nextJob}
								variant='contained'
							>
								<ChevronRightIcon />
							</Button>
						) : null}
					</Box>
				</Container>
			</Paper>
		</>
	)
}

export default AddJobInputs
