import React, { createContext, useReducer } from 'react'

import { LOGIN_ADMIN, LOGOUT_ADMIN } from '../types'
import AuthReducer from './authReducer'

import config from '../../config'

const initialState = {
	authToken: localStorage.getItem('authToken') || ''
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState)

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
		<AuthContext.Provider
			value={{
				loginAdmin,
				setToken,
				logoutAdmin,
				authToken: state.authToken
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
