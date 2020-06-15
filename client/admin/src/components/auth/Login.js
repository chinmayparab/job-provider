import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/globalContext'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = () => {
	const { loginAdmin, isAuth } = useContext(GlobalContext)

	const handleLogin = () => {
		loginAdmin({ name: 'Vikas Pandey' })
	}

	if (isAuth) {
		return (
			<Container align='center'>
				<Typography variant='h2' align='center'>
					You are logged in
				</Typography>
				<Box mt={10}>
					<Button variant='outlined' component={Link} to='/'>
						Home
					</Button>
				</Box>
			</Container>
		)
	}
	return (
		<Container>
			<Typography variant='h2' align='center'>
				Login to Continue
			</Typography>
			<Container maxWidth='xs'>
				<Box mb={2} mt={5}>
					<TextField
						fullWidth
						size='small'
						label='User ID'
						variant='outlined'
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						size='small'
						label='Password'
						type='password'
						variant='outlined'
					/>
				</Box>
				<Box>
					<Button variant='outlined' onClick={handleLogin}>
						Login
					</Button>
				</Box>
			</Container>
		</Container>
	)
}

export default Login
