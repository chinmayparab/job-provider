import React, { useContext, useState, useEffect } from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import { AuthContext } from '../../context/authContext/authContext'
import { JobContext } from '../../context/jobContext/jobContext'

const ApplicantRow = ({ id }) => {
	const { authToken } = useContext(AuthContext)
	const { getApplicantDetails } = useContext(JobContext)

	const [details, setDetails] = useState({})

	useEffect(() => {
		getApplicantDetails(authToken, id).then((res) => {
			setDetails(res)
		})
	}, [])

	return (
		<TableRow>
			<TableCell align='left' component='th' scope='row'>
				{(details.personal_details && details.personal_details.email) || 'N/A'}
			</TableCell>
			<TableCell align='right'>
				<Button color='secondary'>View</Button>
			</TableCell>
		</TableRow>
	)
}

export default ApplicantRow
