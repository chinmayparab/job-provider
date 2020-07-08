import React, { createContext, useReducer } from 'react'

import { LOGIN_ADMIN, LOGOUT_ADMIN } from './types'
import Reducer from './reducer'

const initialState = {
	isAuth: true
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	function loginAdmin(user) {
		dispatch({
			type: LOGIN_ADMIN,
			payload: user
		})
	}

	function logoutAdmin() {
		dispatch({
			type: LOGOUT_ADMIN
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				isAuth: state.isAuth,
				loginAdmin,
				logoutAdmin
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
