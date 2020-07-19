import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { GlobalContext } from '../../context/globalContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authToken } = useContext(GlobalContext)

	return (
		<Route
			{...rest}
			render={(props) =>
				authToken ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

export default PrivateRoute
