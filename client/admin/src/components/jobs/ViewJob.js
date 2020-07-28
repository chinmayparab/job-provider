import React, { useState, useEffect, useContext } from 'react'

import Container from '@material-ui/core/Container'
import TypoGraphy from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import JobCard from './JobCard'

import { AuthContext } from '../../context/authContext/authContext'
import { getJobs } from './functions'

const ViewJob = () => {
	const { authToken } = useContext(AuthContext)

	const [jobs, setJobs] = useState([])

	useEffect(() => {
		getJobs(authToken).then((res) => setJobs(res.alljobs))
	}, [])
	console.log(jobs)

	return (
		<Container>
			<Container maxWidth='md'>
				<TypoGraphy gutterBottom={true} variant='h5'>
					View added Jobs
				</TypoGraphy>
				<Grid container spacing={2}>
					{jobs && jobs.length > 0 ? (
						jobs.map((job, index) => (
							<Grid key={index} item xs={12} sm={6} md={4}>
								<JobCard
									title={job.pos_names}
									description={job.description}
									positions={job.no_positions}
									stipend={job.stipend}
									closing={job.closing_date}
									interview={job.date_time_interview}
								/>
							</Grid>
						))
					) : (
						<TypoGraphy variant='subtitle2'>No jobs added</TypoGraphy>
					)}
				</Grid>
			</Container>
		</Container>
	)
}

export default ViewJob
