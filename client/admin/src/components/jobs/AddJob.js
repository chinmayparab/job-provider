import React, { useState } from 'react'

import AddJobForm from './AddJobForm'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TypoGraphy from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
// import LinearProgress from '@material-ui/core/LinearProgress'
// import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles({
	paper: {
		paddingBottom: '20px'
	},
	flexCenter: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	fileInput: {
		display: 'none'
	},
	fileName: {
		maxWidth: '100%',
		marginTop: '10px',
		marginBottom: '10px',
		paddingLeft: '15px',
		paddingRight: '15px'
	}
})

const AddJob = () => {
	const classes = useStyles()

	const [uploadedImages, setUploadedImages] = useState([])

	const handleUploadedImage = (e) => {
		const files = Array.from(e.target.files)
		setUploadedImages(files)
	}

	const testValues = [
		{
			title: 'title1'
		},
		{
			title: 'title2'
		},
		{
			title: 'title3'
		},
		{
			title: 'title4'
		},
		{
			title: 'title5'
		},
		{
			title: 'title6'
		}
	]

	return (
		<Container>
			<TypoGraphy gutterBottom={true} variant='h5'>
				Add a Job
			</TypoGraphy>
			<Grid container spacing={0}>
				<Grid item sm={2} xs={12}>
					<Paper className={classes.paper}>
						<Box p={2}>
							<TypoGraphy color='textSecondary' variant='subtitle2'>
								Upload a Document
							</TypoGraphy>
						</Box>
						<Box className={classes.flexCenter}>
							<input
								className={classes.fileInput}
								multiple
								id='contained-button-file'
								type='file'
								onChange={handleUploadedImage}
							/>
							<label htmlFor='contained-button-file'>
								<Fab component='span' color='primary' aria-label='add'>
									<AddIcon />
								</Fab>
							</label>
						</Box>
						<Box className={classes.flexCenter}>
							{uploadedImages.length > 0 ? (
								<>
									{uploadedImages.map((uploadedImage, index) => (
										<Tooltip
											key={index}
											title={uploadedImage.name}
											placement='right'
											arrow
										>
											<TypoGraphy
												noWrap={true}
												className={classes.fileName}
												variant='subtitle2'
											>
												{uploadedImage.name}
											</TypoGraphy>
										</Tooltip>
									))}
									<Divider />
									<Button color='secondary' variant='contained'>
										Upload
									</Button>
								</>
							) : null}
						</Box>
					</Paper>
				</Grid>
				<TypoGraphy
					variant='subtitle2'
					color='textSecondary'
					className={classes.flexCenter}
					style={{ minHeight: '50px' }}
				>
					OR
				</TypoGraphy>
				<Grid item sm={9} xs={12}>
					{/* <LinearProgress color='secondary' /> */}
					{/* <Skeleton width='100%' height='100%'> */}
					<AddJobForm values={testValues} />
					{/* </Skeleton> */}
				</Grid>
			</Grid>
		</Container>
	)
}

export default AddJob
