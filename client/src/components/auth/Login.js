import React from 'react'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = (props) => {
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
					<Button
						variant='outlined'
						onClick={() => {
							props.setIsAuth(true)
						}}
					>
						Login
					</Button>
				</Box>
			</Container>
		</Container>
	)
}

export default Login
