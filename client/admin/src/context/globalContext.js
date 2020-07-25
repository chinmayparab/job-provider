import React, { createContext, useReducer } from 'react'

import { LOGIN_ADMIN, LOGOUT_ADMIN, SET_LOADING } from './types'
import Reducer from './reducer'

import config from '../config'

const initialState = {
	authToken: '',
	loading: false
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

	const setLoading = (value) => {
		dispatch({
			type: SET_LOADING,
			payload: value
		})
	}

	const scanJobPdf = (file, fileInput, token) => {
		var formdata = new FormData()
		for (let i = 0; i < file.length; i++) {
			formdata.append('file', fileInput.files[0], file[i].name)
		}

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow'
		}
		setLoading(true)
		fetch('http://127.0.0.1:5000/admin/post-job?token=' + token, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setLoading(false)
				console.log(result)
			})
			.catch((error) => console.log('error', error))
	}

	return (
		<GlobalContext.Provider
			value={{
				authToken: state.authToken,
				loginAdmin,
				setToken,
				logoutAdmin,
				scanJobPdf,
				loading: state.loading
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
