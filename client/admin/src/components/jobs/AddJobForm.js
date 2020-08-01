import React, { useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TypoGraphy from '@material-ui/core/TypoGraphy'
import Grid from '@material-ui/core/Grid'
import { SnackContext } from '../../context/snackContext/snackContext'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'

import AddJobInputs from './AddJobInputs'

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

const AddJobForm = ({ jobs, allText }) => {
	const classes = useStyles()

	const { showSnack } = useContext(SnackContext)

	const totalJobs = jobs.length
	const [renderVar, setRenderVar] = useState(0)

	const { t } = useTranslation()

	const nextJob = () => {
		setRenderVar(Math.min(renderVar + 1, totalJobs - 1))
	}

	const prevJob = () => {
		setRenderVar(Math.max(renderVar - 1, 0))
	}

	const handleCopyToClipboard = (e) => {
		copy(e.target.value)
		showSnack('Copied to clipboard')
	}

	if (jobs.length > 0) {
		return (
			<Grid container>
				<Grid style={{ flex: 1 }} item md={8}>
					{jobs.slice(renderVar, renderVar + 1).map((job) => (
						<AddJobInputs
							key={renderVar}
							renderVar={renderVar}
							totalJobs={totalJobs}
							prevJob={prevJob}
							nextJob={nextJob}
							job={job}
						/>
					))}
				</Grid>
				<Grid item md={4}>
					<Paper className={classes.copyPaper}>
						<Box p={1}>
							<TypoGraphy color='textSecondary' variant='subtitle2'>
								{t('Other relevant data')}
							</TypoGraphy>
						</Box>
						{allText && allText.length > 0 ? (
							allText.map((text, index) => (
								<TextField
									key={index}
									margin='dense'
									variant='outlined'
									fullWidth
									multiline
									value={text}
									onClick={handleCopyToClipboard}
								/>
							))
						) : (
							<TypoGraphy variant='subtitle2'>
								{t('No additional data found')}
							</TypoGraphy>
						)}
					</Paper>
				</Grid>
			</Grid>
		)
	} else {
		return <AddJobInputs />
	}
}

export default AddJobForm
