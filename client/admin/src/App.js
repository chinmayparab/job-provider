import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { GlobalProvider } from './context/globalContext'

import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'

const App = () => {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<CssBaseline />
				<Navbar title={'JobSetu Admin'} />
				<Box my={12}>
					<Route exact path='/' component={Home} />
					<Route exact path='/login'>
						<Login />
					</Route>
				</Box>
			</BrowserRouter>
		</GlobalProvider>
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
