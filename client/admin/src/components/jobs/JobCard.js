import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(2),
		height: '100%'
	},
	buttons: {
		marginTop: theme.spacing(3)
	}
}))

const JobCard = ({
	title,
	description,
	positions,
	stipend,
	closing,
	interview
}) => {
	const classes = useStyles()

	return (
		<Paper className={classes.card}>
			<Box>
				<Typography noWrap variant='h6'>
					{title}
				</Typography>
			</Box>
			<Box>
				<Tooltip title={description} placement='bottom' arrow>
					<Typography noWrap variant='body2'>
						{description}
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
							{positions}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography noWrap variant='subtitle2'>
							Stipend
						</Typography>
						<Typography noWrap variant='body2'>
							{stipend}
						</Typography>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography noWrap variant='subtitle2'>
							Closing Date
						</Typography>
						<Typography noWrap variant='body2'>
							{closing}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography noWrap variant='subtitle2'>
							Interview Date
						</Typography>
						<Typography noWrap variant='body2'>
							{interview}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Grid className={classes.buttons} container spacing={2}>
				<Grid style={{ textAlign: 'center' }} item xs={6}>
					<Button color='primary' variant='outlined'>
						View
					</Button>
				</Grid>
				<Grid style={{ textAlign: 'center' }} item xs={6}>
					<Button color='secondary' variant='outlined'>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default JobCard
