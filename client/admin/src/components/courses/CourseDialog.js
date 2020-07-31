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

const CourseDialog = ({ detailsOpen, setDetailsOpen, course }) => {
	const classes = useStyles()

	const handleClose = () => {
		setDetailsOpen(false)
	}
	// console.log(course)
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
							{course.title}
						</Typography>
						<Typography variant='subtitle2'>Description</Typography>
						<Typography gutterBottom variant='body1'>
							{course.description}
						</Typography>
					</Box>
					<Divider style={{ marginTop: '2rem', marginBottom: '2rem' }} />
					<Grid container spacing={3}>
						<Grid item style={{ width: '100%' }} sm={6}>
							<Typography gutterBottom variant='h6'>
								Course Details
							</Typography>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='simple table'>
									<TableBody>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Category
											</TableCell>
											<TableCell align='right'>{course.category}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Level
											</TableCell>
											<TableCell align='right'>{course.level}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Price
											</TableCell>
											<TableCell align='right'>Rs. {course.price}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Skills Taught
											</TableCell>
											<TableCell align='right'>
												{course.skills_taught}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item style={{ width: '100%' }} sm={6}>
							<Typography gutterBottom variant='h6'>
								Enrolled Candidates
							</Typography>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label='simple table'>
									<TableBody>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Category
											</TableCell>
											<TableCell align='right'>{course.category}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Level
											</TableCell>
											<TableCell align='right'>{course.level}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Price
											</TableCell>
											<TableCell align='right'>Rs. {course.price}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell align='left' component='th' scope='row'>
												Skills Taught
											</TableCell>
											<TableCell align='right'>
												{course.skills_taught}
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

export default CourseDialog
