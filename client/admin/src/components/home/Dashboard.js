import React, { useEffect, useContext } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import jwtDecode from 'jsonwebtoken/decode'
import { AuthContext } from '../../context/authContext/authContext'
import { JobContext } from '../../context/jobContext/jobContext'

import JobCard from '../jobs/JobCard'

import { useTranslation } from 'react-i18next'

const Dashboard = () => {
	const { authToken } = useContext(AuthContext)
	const { postedJobs, getPostedJobs } = useContext(JobContext)
	const user = jwtDecode(authToken)

	useEffect(() => getPostedJobs(authToken), [])

	const { t } = useTranslation()

	return (
		<>
			<Container>
				<Typography variant='h4'>Welcome to your Dashboard</Typography>
				<Typography
					style={{ marginLeft: '5px' }}
					gutterBottom
					variant='caption'
				>
					You are signed in as {user.username}
				</Typography>
				<Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
				<Typography gutterBottom variant='body1'>
					{t('Jobs added by you')}
				</Typography>
				<Grid container spacing={3}>
					{postedJobs && postedJobs.length > 0 ? (
						postedJobs.map((job, index) => (
							<Grid key={index} item xs={12} sm={6} md={4}>
								<JobCard job={job} />
							</Grid>
						))
					) : (
						<Typography variant='subtitle2'>{t('No jobs added')}</Typography>
					)}
				</Grid>
			</Container>
		</>
	)
}

export default Dashboard
