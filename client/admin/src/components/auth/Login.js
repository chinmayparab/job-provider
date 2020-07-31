import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext/authContext'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import jwtDecode from 'jsonwebtoken/decode'

import { useTranslation } from 'react-i18next'

const Login = () => {
	const { loginAdmin, authToken } = useContext(AuthContext)
	const [user, setUser] = useState({ id: '', password: '' })

	const handleLogin = () => {
		loginAdmin(user)
	}

	const { t } = useTranslation()

	if (authToken.length > 0) {
		const loggedInUser = jwtDecode(authToken)
		return (
			<Container align='center'>
				<Typography variant='h2' align='center'>
					{t('You are logged in')}
				</Typography>
				<Typography variant='subtitle2'>{`ID: ${loggedInUser.username}`}</Typography>
				<Box mt={10}>
					<Button variant='outlined' component={Link} to='/'>
						{t('Home')}
					</Button>
				</Box>
			</Container>
		)
	}
	return (
		<Container>
			<Typography variant='h2' align='center'>
				{t('Login to Continue')}
			</Typography>
			<Container maxWidth='xs'>
				<Box mb={2} mt={5}>
					<TextField
						fullWidth
						size='small'
						label='User ID'
						variant='outlined'
						value={user.id}
						onChange={(e) => setUser({ ...user, id: e.target.value })}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						size='small'
						label='Password'
						type='password'
						variant='outlined'
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
				</Box>
				<Box>
					<Button variant='outlined' onClick={handleLogin}>
						{t('Login')}
					</Button>
				</Box>
			</Container>
		</Container>
	)
}

export default Login
