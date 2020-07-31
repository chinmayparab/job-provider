import React, { useContext } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import jwtDecode from 'jsonwebtoken/decode'
import { AuthContext } from '../../context/authContext/authContext'

const Dashboard = () => {
	const { authToken } = useContext(AuthContext)
	const user = jwtDecode(authToken)
	return (
		<>
			<Container>
				<Typography variant='h4'>Welcome to your Dashboard</Typography>
				<Typography
					style={{ marginLeft: '5px' }}
					gutterBottom
					variant='caption'
				>
					You are signed in as {user.username}
				</Typography>
			</Container>
		</>
	)
}

export default Dashboard
