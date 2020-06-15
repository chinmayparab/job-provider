import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TypoGraphy from '@material-ui/core/TypoGraphy'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles({
	paper: {
		paddingBottom: '20px'
	}
})

const AddJobForm = ({ values }) => {
	const classes = useStyles()

	const totalJobs = values.length
	const [renderVar, setRenderVar] = useState(0)

	const nextJob = () => {
		setRenderVar(Math.min(renderVar + 1, totalJobs - 1))
	}

	const prevJob = () => {
		setRenderVar(Math.max(renderVar - 1, 0))
	}

	const handleAddJob = () => {
		console.log('Add job')
	}

	return values.slice(renderVar, renderVar + 1).map((value) => (
		<Paper key={renderVar} className={classes.paper}>
			<Box p={2}>
				<TypoGraphy color='textSecondary' variant='subtitle2'>
					Manually Add a Job ({renderVar + 1}/{totalJobs})
				</TypoGraphy>
			</Box>
			<Container maxWidth='md'>
				<TextField
					margin='dense'
					defaultValue={value.title}
					label='Job Title'
					fullWidth={true}
				/>
				<TextField
					margin='dense'
					label='Job Description'
					multiline={true}
					helperText='Maximum 1000 characters'
					fullWidth={true}
				/>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<TextField
							margin='dense'
							label='Total Vacancies'
							type='number'
							fullWidth={true}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<KeyboardDatePicker
							margin='dense'
							label='Closing Date'
							format='DD/MM/yyyy'
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
							fullWidth={true}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<TextField margin='dense' label='Category' fullWidth={true} />
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField margin='dense' label='Job Location' fullWidth={true} />
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

					<Button color='secondary' onClick={handleAddJob} variant='contained'>
						Add Job
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
	))
}

export default AddJobForm
