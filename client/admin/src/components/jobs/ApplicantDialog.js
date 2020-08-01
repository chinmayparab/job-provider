import React, { useState, useEffect, useContext } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import Box from '@material-ui/core/Box'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'

import Slider from 'react-slick'

import { AuthContext } from '../../context/authContext/authContext'
import { useTranslation } from 'react-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './overwrite.css'

import { getStatus, setDBStatus } from './functions'

const ApplicantDialog = ({ open, setOpen, details, userId, jobId }) => {
	const { t } = useTranslation()

	const { authToken } = useContext(AuthContext)
	const [status, setStatus] = useState('')

	const personal = details.personal_details
	const skills = details.skills_list
	const education = details.edu_details
	const experience = details.job_details
	const projects = details.projects_list

	const settings = {
		dots: false,
		infinite: false,
		arrows: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	}

	useEffect(() => {
		getStatus(authToken, userId, jobId).then((res) => setStatus(res))
	}, [])

	const handleStatusChange = (e) => {
		setDBStatus(authToken, userId, jobId, e.target.value).then((res) =>
			res ? setStatus(e.target.value) : console.log('setStatusError')
		)
	}

	return (
		<Dialog open={open} fullWidth onClose={() => setOpen(false)}>
			<DialogTitle style={{ background: '#f2f2f2' }}>
				{t('Applicant Details')}
			</DialogTitle>
			<DialogContent style={{ background: '#f2f2f2' }}>
				<Container>
					<Slider {...settings}>
						{/* PERSONAL */}
						<TableContainer component={Box}>
							<Typography gutterBottom variant='body1'>
								{t('Personal Details')}
							</Typography>
							<Table style={{ marginTop: '1rem', background: '#fff' }}>
								<TableBody>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Email
										</TableCell>
										<TableCell align='right'>
											{personal && personal.email}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Phone
										</TableCell>
										<TableCell align='right'>
											{personal && personal.phone_no}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Location
										</TableCell>
										<TableCell align='right'>
											{personal && personal.location}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Additional edu_details
										</TableCell>
										<TableCell align='right'>
											{personal && personal.additional_details}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						{/* SKILLS */}
						<TableContainer component={Box}>
							<Typography gutterBottom variant='body1'>
								{t('Skills')}
							</Typography>
							<Table style={{ marginTop: '1rem', background: '#fff' }}>
								<TableBody>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Email
										</TableCell>
										<TableCell align='right'>
											{personal && personal.email}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Phone
										</TableCell>
										<TableCell align='right'>
											{personal && personal.phone_no}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Location
										</TableCell>
										<TableCell align='right'>
											{personal && personal.location}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align='left' component='th' scope='row'>
											Additional edu_details
										</TableCell>
										<TableCell align='right'>
											{personal && personal.additional_details}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						{/* EDUCATION */}
						<TableContainer component={Box}>
							<Typography gutterBottom variant='body1'>
								{t('Education Details')}
							</Typography>

							{education &&
								typeof education !== 'string' &&
								education.map((val, index) => (
									<Table
										style={{ marginTop: '1rem', background: '#fff' }}
										key={index}
									>
										<TableBody>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													College
												</TableCell>
												<TableCell align='right'>{val.college}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Degree
												</TableCell>
												<TableCell align='right'>{val.degree}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Stream
												</TableCell>
												<TableCell align='right'>{val.stream}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								))}
						</TableContainer>
						{/* EXPERIENCE */}
						<TableContainer component={Box}>
							<Typography gutterBottom variant='body1'>
								{t('Experience Details')}
							</Typography>

							{experience &&
								typeof experience !== 'string' &&
								experience.map((val, index) => (
									<Table
										style={{ marginTop: '1rem', background: '#fff' }}
										key={index}
									>
										<TableBody>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Job Title
												</TableCell>
												<TableCell align='right'>{val.job_title}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Organization
												</TableCell>
												<TableCell align='right'>{val.organiztion}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Description
												</TableCell>
												<TableCell align='right'>{val.description}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								))}
						</TableContainer>
						{/* PROJECTS */}
						<TableContainer component={Box}>
							<Typography gutterBottom variant='body1'>
								{t('Project Details')}
							</Typography>

							{projects &&
								typeof projects !== 'string' &&
								projects.map((val, index) => (
									<Table
										style={{ marginTop: '1rem', background: '#fff' }}
										key={index}
									>
										<TableBody>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Project Title
												</TableCell>
												<TableCell align='right'>{val.title}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Description
												</TableCell>
												<TableCell align='right'>{val.description}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell align='left' component='th' scope='row'>
													Project Link
												</TableCell>
												<TableCell align='right'>{val.project_link}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								))}
						</TableContainer>
					</Slider>
					<Divider />
					<Box style={{ textAlign: 'center' }} my={3}>
						<Typography gutterBottom>Application Status</Typography>
						<Select
							variant='outlined'
							margin='dense'
							value={status}
							onChange={handleStatusChange}
						>
							<MenuItem value='applied'>Applied</MenuItem>
							<MenuItem value='selected'>Selected</MenuItem>
							<MenuItem value='underreview'>Under Review</MenuItem>
							<MenuItem value='notselected'>Not Selected</MenuItem>
						</Select>
					</Box>
				</Container>
			</DialogContent>
			<DialogActions style={{ background: '#f2f2f2' }}>
				<Button onClick={() => setOpen(false)} autoFocus>
					{t('Close')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ApplicantDialog
