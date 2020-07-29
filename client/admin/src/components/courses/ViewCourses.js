import React, { useState, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { getAllCourses } from './functions'
import CourseCard from './CourseCard.js'

const ViewCourses = () => {
	const [courses, setCourses] = useState([])

	useEffect(() => {
		getAllCourses().then((res) => setCourses(res))
	}, [])

	return (
		<Container>
			<Container>
				<Typography gutterBottom={true} variant='h5'>
					View all Courses
				</Typography>
				<Grid container spacing={3}>
					{courses.length > 0 ? (
						courses.map((course, index) => (
							<Grid key={index} item xs={12} sm={6} md={4}>
								<CourseCard
									category={course.category}
									title={course.title}
									price={course.price}
									description={course.description}
									skills={course.skills_taught}
									level={course.level}
								/>
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
