import React, { useEffect, useContext, useState } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import jwtDecode from 'jsonwebtoken/decode'
import { AuthContext } from '../../context/authContext/authContext'
import { JobContext } from '../../context/jobContext/jobContext'
import { CourseContext } from '../../context/courseContext/courseContext'

import JobCard from '../jobs/JobCard'
import config from '../../config'

import { useTranslation } from 'react-i18next'

const Dashboard = () => {
	const { authToken } = useContext(AuthContext)
	const { postedJobs, getPostedJobs, jobs, getJobs } = useContext(JobContext)
	const { courses, getAllCourses } = useContext(CourseContext)

	const [totalUsers, setTotalUsers] = useState(0)
	const [totalSkills, setTotalSkills] = useState(0)

	const user = jwtDecode(authToken)

	const getTotalUsers = () => {
		fetch(config.root + '/users-count')
			.then((response) => response.json())
			.then((result) => setTotalUsers(result.usercounts))
	}
	const getTotalSkills = () => {
		fetch(config.root + '/skills-count')
			.then((response) => response.json())
			.then((result) => setTotalSkills(result.skillcounts))
	}

	useEffect(() => {
		getPostedJobs(authToken)
		getAllCourses()
		getJobs()
		getTotalUsers()
		getTotalSkills()
	}, [])

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
				<Grid container spacing={3}>
					<Grid style={{ width: '100%' }} item xs={6} md={3}>
						<Paper
							style={{
								height: '100%',
								textAlign: 'center',
								paddingTop: '10px'
							}}
							elevation={4}
						>
							<Typography variant='subtitle2'>Total Courses</Typography>
							<Counter start={0} end={courses && courses.length} />
						</Paper>
					</Grid>
					<Grid style={{ width: '100%' }} item xs={6} md={3}>
						<Paper
							style={{
								height: '100%',
								textAlign: 'center',
								paddingTop: '10px'
							}}
							elevation={4}
						>
							<Typography variant='subtitle2'>Total Jobs</Typography>
							<Counter start={0} end={jobs && jobs.length} />
						</Paper>
					</Grid>
					<Grid style={{ width: '100%' }} item xs={6} md={3}>
						<Paper
							style={{
								height: '100%',
								textAlign: 'center',
								paddingTop: '10px'
							}}
							elevation={4}
						>
							<Typography variant='subtitle2'>Total Skills</Typography>
							<Counter start={0} end={totalSkills} />
						</Paper>
					</Grid>
					<Grid style={{ width: '100%' }} item xs={6} md={3}>
						<Paper
							style={{
								height: '100%',
								textAlign: 'center',
								paddingTop: '10px'
							}}
							elevation={4}
						>
							<Typography variant='subtitle2'>Total users</Typography>
							<Counter start={0} end={totalUsers} />
						</Paper>
					</Grid>
				</Grid>
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

const Counter = ({ start, end }) => {
	const [num, setNum] = useState(start)

	setTimeout(() => {
		if (num < end) {
			setNum(num + 1)
		}
	}, 30)

	return (
		<Typography
			style={{ fontWeight: '500' }}
			variant='h1'
			color={num < end || num === 0 ? 'textSecondary' : 'secondary'}
		>
			{num}
		</Typography>
	)
}

export default Dashboard
