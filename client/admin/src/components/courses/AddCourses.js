import React, { useState, useContext, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import { AuthContext } from '../../context/authContext/authContext'
import { CourseContext } from '../../context/courseContext/courseContext'
import { SnackContext } from '../../context/snackContext/snackContext'

import { getSkills } from './functions'

const AddCourses = () => {
	const { authToken } = useContext(AuthContext)
	const { addCourse } = useContext(CourseContext)
	const { showSnack } = useContext(SnackContext)

	const [allSkills, setAllSkills] = useState([])
	const [allCats, setAllCats] = useState([])

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

	const getCats = (arr) => {
		let ret = []
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i].category !== arr[i + 1].category) {
				ret.push(arr[i].category)
			}
		}
		ret.push(arr[arr.length - 1].category)
		return ret
	}

	useEffect(() => {
		getSkills().then((res) => {
			setAllSkills(res)
			setAllCats(getCats(res))
		})
	}, [])

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
								<FormControl fullWidth>
									<InputLabel id='level-label'>Level</InputLabel>
									<Select
										labelId='level-label'
										required
										fullWidth
										margin='none'
										onChange={handleInput}
										name='level'
										value={data.level}
									>
										<MenuItem value='Beginner'>Beginner</MenuItem>
										<MenuItem value='Intermediate'>Intermediate</MenuItem>
										<MenuItem value='Advanced'>Advanced</MenuItem>
									</Select>
								</FormControl>
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
									label='URL'
									fullWidth
									onChange={handleInput}
									name='url'
									value={data.url}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel id='skills-label'>Skill Taught</InputLabel>
									<Select
										labelId='skills-label'
										required
										fullWidth
										margin='none'
										onChange={handleInput}
										name='skills_taught'
										value={data.skills_taught}
									>
										{allSkills &&
											allSkills.length > 0 &&
											allSkills.map((skill, index) => (
												<MenuItem key={index} value={skill.title}>
													{skill.title}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel id='category-label'>Category</InputLabel>
									<Select
										labelId='category-label'
										required
										fullWidth
										margin='none'
										onChange={handleInput}
										name='category'
										value={data.category}
									>
										{allCats &&
											allCats.length > 0 &&
											allCats.map((cat, index) => (
												<MenuItem key={index} value={cat}>
													{cat}
												</MenuItem>
											))}
									</Select>
								</FormControl>
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
