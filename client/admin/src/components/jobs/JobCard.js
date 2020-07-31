import React, { useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AuthContext } from '../../context/authContext/authContext'
import { SnackContext } from '../../context/snackContext/snackContext'
import { deleteJob } from './functions'
import JobDialog from './JobDialog'

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(2),
		height: '100%'
	},
	buttons: {
		marginTop: theme.spacing(3)
	}
}))

const JobCard = ({ job }) => {
	const classes = useStyles()
	const [detailsOpen, setDetailsOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const { authToken } = useContext(AuthContext)
	const { showSnack } = useContext(SnackContext)

	const handleDetailsOpen = () => {
		setDetailsOpen(true)
	}
	const handleDelete = () => {
		deleteJob(authToken, job.job_id).then((res) => {
			if (res === true) {
				setDeleteOpen(false)
				showSnack('Job Deleted')
			} else {
				setDeleteOpen(false)
				showSnack('Something went wrong')
			}
		})
	}
	const handleDeleteOpen = () => {
		setDeleteOpen(true)
	}
	const handleDeleteClose = () => {
		setDeleteOpen(false)
	}

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
								No. of positions
							</Typography>
							<Typography noWrap variant='body2'>
								{job.no_postions}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography noWrap variant='subtitle2'>
								Stipend
							</Typography>
							<Typography noWrap variant='body2'>
								{job.stipend}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography noWrap variant='subtitle2'>
								Closing Date
							</Typography>
							<Typography noWrap variant='body2'>
								{new Date(job.closing_date).toLocaleDateString('en-GB')}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography noWrap variant='subtitle2'>
								Interview Date
							</Typography>
							<Typography noWrap variant='body2'>
								{new Date(job.date_time_interview).toLocaleDateString('en-GB')}
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Grid className={classes.buttons} container spacing={2}>
					<Grid style={{ textAlign: 'center' }} item xs={6}>
						<Button
							onClick={handleDetailsOpen}
							color='primary'
							variant='outlined'
						>
							View
						</Button>
					</Grid>
					<Grid style={{ textAlign: 'center' }} item xs={6}>
						<Button
							onClick={handleDeleteOpen}
							color='secondary'
							variant='outlined'
						>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Paper>
			<JobDialog
				job={job}
				detailsOpen={detailsOpen}
				setDetailsOpen={setDetailsOpen}
			/>
			<Dialog open={deleteOpen} onClose={handleDeleteClose}>
				<DialogTitle>Delete Job?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						This action cannot be reverted. Are you sure you want to delete job{' '}
						<span style={{ fontWeight: '700' }}>{job.pos_names}</span> ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete} color='secondary'>
						Delete Job
					</Button>
					<Button onClick={handleDeleteClose} autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default JobCard
