import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'

const App = () => {
	const [isAuth, setIsAuth] = useState(false)

	return (
		<BrowserRouter>
			<CssBaseline />
			<Navbar isAuth={isAuth} setIsAuth={setIsAuth} title={'JobSetu'} />
			<Box my={12}>
				<Route exact path='/' component={Home} />
				<Route exact path='/login'>
					<Login isAuth={isAuth} setIsAuth={setIsAuth} />
				</Route>
			</Box>
		</BrowserRouter>
	)
}

const Home = () => (
	<div
		style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
	>
		<h1>Home</h1>
	</div>
)

export default App
