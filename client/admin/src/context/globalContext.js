import React, { createContext, useReducer } from 'react'

import { LOGIN_ADMIN, LOGOUT_ADMIN } from './types'
import Reducer from './reducer'

import config from '../config'

const initialState = {
	isAuth: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	const loginAdmin = (user) => {
		var myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')
		var raw = JSON.stringify({ username: user.id, password: user.password })

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}

		fetch(config.server + '/login', requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((err) => console.log(err))

		// dispatch({
		// 	type: LOGIN_ADMIN,
		// 	payload: user
		// })
	}

	const logoutAdmin = () => {
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
