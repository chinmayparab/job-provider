import React, { createContext, useReducer } from 'react'

import { LOGIN_ADMIN, LOGOUT_ADMIN } from './types'
import Reducer from './reducer'

import config from '../config'

const initialState = {
	authToken: ''
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
			.then((result) => {
				setToken(result.token)
			})
			.catch((err) => console.log(err))
	}

	const setToken = (token) => {
		localStorage.setItem('authToken', token)
		dispatch({
			type: LOGIN_ADMIN,
			payload: token
		})
	}

	const logoutAdmin = () => {
		localStorage.removeItem('authToken')
		dispatch({
			type: LOGOUT_ADMIN
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				authToken: state.authToken,
				loginAdmin,
				setToken,
				logoutAdmin
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
