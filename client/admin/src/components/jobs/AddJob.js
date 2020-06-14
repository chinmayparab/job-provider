import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TypoGraphy from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
	paper: {
		paddingBottom: '20px'
	},
	flexCenter: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

const AddJob = () => {
	const classes = useStyles()

	return (
		<Container>
			<TypoGraphy gutterBottom={true} variant='h5'>
				Add a Job
			</TypoGraphy>
			<Grid container spacing={0}>
				<Grid item sm={3} xs={12}>
					<Paper className={classes.paper}>
						<Box p={2}>
							<TypoGraphy color='textSecondary' variant='subtitle2'>
								Upload a Document
							</TypoGraphy>
						</Box>
						<Box className={classes.flexCenter}>
							<Fab color='secondary' aria-label='add'>
								<AddIcon />
							</Fab>
						</Box>
					</Paper>
				</Grid>
				<TypoGraphy
					variant='subtitle2'
					color='textSecondary'
					className={classes.flexCenter}
					style={{ minHeight: '50px' }}
				>
					OR
				</TypoGraphy>
				<Grid item sm={8} xs={12}>
					<Paper className={classes.paper}>
						<Box p={2}>
							<TypoGraphy color='textSecondary' variant='subtitle2'>
								Manually Add a Job
							</TypoGraphy>
						</Box>
						<Container maxWidth='md'>
							<TextField margin='dense' label='Job Title' fullWidth={true} />
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
									<TextField
										margin='dense'
										label='Job Location'
										fullWidth={true}
									/>
								</Grid>
							</Grid>
							<Box mt={3} align='right'>
								<Button color='secondary' variant='contained'>
									Add Job
								</Button>
							</Box>
						</Container>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default AddJob
