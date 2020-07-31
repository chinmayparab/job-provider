import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import Grid from '@material-ui/core/Grid'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	body: {
		marginTop: theme.spacing(5)
	}
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const JobDialog = ({ detailsOpen, setDetailsOpen, job }) => {
	const classes = useStyles()

	const handleClose = () => {
		setDetailsOpen(false)
	}

	return (
		<Dialog
			fullScreen
			open={detailsOpen}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<Box style={{ backgroundColor: '#E5E5E5', height: '100%' }}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant='h6' className={classes.title}>
							View Details
						</Typography>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Container className={classes.body}>
					<Box>
						<Typography variant='subtitle2'>Title</Typography>
						<Typography gutterBottom variant='body1'>
							{job.pos_names}
						</Typography>
						<Typography variant='subtitle2'>Description</Typography>
						<Typography gutterBottom variant='body1'>
							{job.description}
						</Typography>
					</Box>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<Grid container spacing={3}>
						<Grid item style={{ width: '100%' }} sm={6}>
							<Typography gutterBottom variant='h6'>
								Job Details
							</Typography>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='simple table'>
									<TableBody>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												No. of Positions
											</TableCell>
											<TableCell align='right'>{job.no_postions}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Stipend
											</TableCell>
											<TableCell align='right'>{job.stipend}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Job Location
											</TableCell>
											<TableCell align='right'>{job.interveiw_loc}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Interview Mode
											</TableCell>
											<TableCell align='right'>{job.interview_mode}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Interview Date
											</TableCell>
											<TableCell align='right'>
												{new Date(job.date_time_interview).toLocaleDateString(
													'en-GB'
												)}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Closing Date
											</TableCell>
											<TableCell align='right'>
												{new Date(job.closing_date).toLocaleDateString('en-GB')}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Posted By
											</TableCell>
											<TableCell align='right'>{job.posted_by}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Posted On
											</TableCell>
											<TableCell align='right'>
												{new Date(job.posted_on).toLocaleString('en-GB')}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item style={{ width: '100%' }} sm={6}>
							<Typography gutterBottom variant='h6'>
								Applied Candidates
							</Typography>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='simple table'>
									<TableBody>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												No. of Positions
											</TableCell>
											<TableCell align='right'>{job.no_postions}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Stipend
											</TableCell>
											<TableCell align='right'>{job.stipend}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Job Location
											</TableCell>
											<TableCell align='right'>{job.interveiw_loc}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Interview Mode
											</TableCell>
											<TableCell align='right'>{job.interview_mode}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Interview Date
											</TableCell>
											<TableCell align='right'>
												{new Date(job.date_time_interview).toLocaleDateString()}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Closing Date
											</TableCell>
											<TableCell align='right'>
												{new Date(job.closing_date).toLocaleDateString()}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Posted By
											</TableCell>
											<TableCell align='right'>{job.posted_by}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Posted On
											</TableCell>
											<TableCell align='right'>
												{new Date(job.posted_on).toLocaleString()}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Dialog>
	)
}

export default JobDialog
