import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import { GlobalProvider } from './context/globalContext'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import AddJob from './components/jobs/AddJob'
import ViewJob from './components/jobs/ViewJob'

const App = () => {
	return (
		<GlobalProvider>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<BrowserRouter>
					<CssBaseline />
					<Box style={{ backgroundColor: '#e5e5e5', minHeight: '100vh' }}>
						<Navbar title={'JobSetu Admin'} />
						<Box my={12}>
							<Route exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Switch>
								<PrivateRoute exact path='/add-job' component={AddJob} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/view-job' component={ViewJob} />
							</Switch>
						</Box>
					</Box>
				</BrowserRouter>
			</MuiPickersUtilsProvider>
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
