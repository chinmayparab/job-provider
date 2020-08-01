import React, { useEffect, useContext } from 'react'

import Container from '@material-ui/core/Container'
import TypoGraphy from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import JobCard from './JobCard'

import { JobContext } from '../../context/jobContext/jobContext'

import { useTranslation } from 'react-i18next'

const ViewJob = () => {
	const { jobs, getJobs } = useContext(JobContext)

	useEffect(() => {
		getJobs()
	}, [])

	const { t } = useTranslation()

	return (
		<>
			<Container>
				<Container>
					<TypoGraphy gutterBottom={true} variant='h5'>
						{t('View all jobs')}
					</TypoGraphy>
					<Grid container spacing={2}>
						{jobs && jobs.length > 0 ? (
							jobs.map((job, index) => (
								<Grid key={index} item xs={12} sm={6} md={4}>
									<JobCard job={job} />
								</Grid>
							))
						) : (
							<TypoGraphy variant='subtitle2'>{t('No jobs added')}</TypoGraphy>
						)}
					</Grid>
				</Container>
			</Container>
		</>
	)
}

export default ViewJob
