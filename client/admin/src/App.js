import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import jwtDecode from 'jsonwebtoken/decode'

import { AuthContext } from './context/authContext/authContext'
import { SnackContext } from './context/snackContext/snackContext'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import AddJob from './components/jobs/AddJob'
import ViewJob from './components/jobs/ViewJob'
import AddCourses from './components/courses/AddCourses'
import ViewCourses from './components/courses/ViewCourses'

import Dashboard from './components/home/Dashboard'

const App = () => {
	const { setToken, logoutAdmin } = useContext(AuthContext)
	const { snackOpen, snackMsg, hideSnack } = useContext(SnackContext)

	const checkLogin = () => {
		const localAuthToken = localStorage.getItem('authToken')
		if (localAuthToken) {
			const { exp } = jwtDecode(localAuthToken)
			if (exp < new Date().getTime()) {
				setToken(localAuthToken)
			} else {
				logoutAdmin()
			}
		}
	}

	useEffect(checkLogin, [])

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<BrowserRouter>
				<CssBaseline />
				<Box style={{ backgroundColor: '#e5e5e5', minHeight: '100vh' }}>
					<Navbar title={'JobSetu Admin'} />
					<Box my={12}>
						<Route exact path='/login' component={Login} />
						<Switch>
							<PrivateRoute exact path='/' component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/add-job' component={AddJob} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/view-job' component={ViewJob} />
						</Switch>
						<Switch>
							<PrivateRoute exact path='/add-courses' component={AddCourses} />
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path='/view-courses'
								component={ViewCourses}
							/>
						</Switch>
					</Box>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left'
						}}
						open={snackOpen}
						autoHideDuration={3000}
						onClose={hideSnack}
						message={snackMsg}
					/>
				</Box>
			</BrowserRouter>
		</MuiPickersUtilsProvider>
	)
}

export default App
