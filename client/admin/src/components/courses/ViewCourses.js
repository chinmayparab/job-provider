import React, { useEffect, useContext } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { CourseContext } from '../../context/courseContext/courseContext'
import CourseCard from './CourseCard.js'

const ViewCourses = () => {
	const { courses, getAllCourses } = useContext(CourseContext)

	useEffect(() => {
		getAllCourses()
	}, [])

	return (
		<Container>
			<Container>
				<Typography gutterBottom={true} variant='h5'>
					View all Courses
				</Typography>
				<Grid container spacing={3}>
					{courses && courses.length > 0 ? (
						courses.map((course, index) => (
							<Grid key={index} item xs={12} sm={6} md={4}>
								<CourseCard course={course} />
							</Grid>
						))
					) : (
						<span />
					)}
				</Grid>
			</Container>
		</Container>
	)
}

export default ViewCourses
