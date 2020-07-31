import React, { useState, useContext } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../../context/authContext/authContext'
import { CourseContext } from '../../context/courseContext/courseContext'
import { SnackContext } from '../../context/snackContext/snackContext'

const AddCourses = () => {
	const { authToken } = useContext(AuthContext)
	const { addCourse } = useContext(CourseContext)
	const { showSnack } = useContext(SnackContext)

	const [data, setData] = useState({
		category: '',
		description: '',
		level: '',
		price: '',
		skills_taught: '',
		title: '',
		url: ''
	})

	const handleInput = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	const handleAddCourse = () => {
		addCourse(data, authToken).then((res) => {
			if (res) {
				showSnack('New course added')
			} else {
				showSnack('Something went wrong. Try again')
			}
		})
	}

	return (
		<>
			<Container>
				<Typography gutterBottom={true} variant='h5'>
					Add a Course
				</Typography>
				<Paper>
					<Box p={5} mt={5}>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='Title'
									fullWidth
									onChange={handleInput}
									name='title'
									value={data.title}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='Category'
									fullWidth
									onChange={handleInput}
									name='category'
									value={data.category}
								/>
							</Grid>
						</Grid>
						<TextField
							required
							margin='dense'
							multiline
							label='Description'
							fullWidth
							onChange={handleInput}
							name='description'
							value={data.description}
						/>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='Price'
									fullWidth
									onChange={handleInput}
									name='price'
									value={data.price}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='Level'
									fullWidth
									onChange={handleInput}
									name='level'
									value={data.level}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='Skills taught'
									fullWidth
									onChange={handleInput}
									name='skills_taught'
									value={data.skills_taught}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									margin='dense'
									label='URL'
									fullWidth
									onChange={handleInput}
									name='url'
									value={data.url}
								/>
							</Grid>
						</Grid>
						<Box style={{ textAlign: 'right' }} mt={5}>
							<Button
								onClick={handleAddCourse}
								color='secondary'
								variant='contained'
							>
								Add Course
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
		</>
	)
}

export default AddCourses
