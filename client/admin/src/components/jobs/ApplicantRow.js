import React, { useContext, useState, useEffect } from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

import ApplicantDialog from './ApplicantDialog'
import { AuthContext } from '../../context/authContext/authContext'
import { JobContext } from '../../context/jobContext/jobContext'

const ApplicantRow = ({ id }) => {
	const { authToken } = useContext(AuthContext)
	const { getApplicantDetails } = useContext(JobContext)

	const [details, setDetails] = useState({})
	const [open, setOpen] = useState(false)

	useEffect(() => {
		getApplicantDetails(authToken, id).then((res) => {
			setDetails(res)
		})
	}, [])

	return (
		<>
			<TableRow>
				<TableCell align='left' component='th' scope='row'>
					{(details.personal_details && details.personal_details.email) ||
						'N/A'}
				</TableCell>
				<TableCell align='right'>
					<Button onClick={() => setOpen(true)} color='secondary'>
						View
					</Button>
				</TableCell>
			</TableRow>
			<ApplicantDialog open={open} setOpen={setOpen} details={details} />
		</>
	)
}

export default ApplicantRow
