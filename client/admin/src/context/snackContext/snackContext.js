import React, { createContext, useReducer } from 'react'

import { SHOW_SNACK, HIDE_SNACK } from '../types'
import SnackReducer from './snackReducer'

const initialState = {
	snackOpen: false,
	snackMsg: ''
}

export const SnackContext = createContext(initialState)

export const SnackProvider = ({ children }) => {
	const [state, dispatch] = useReducer(SnackReducer, initialState)

	const showSnack = (msg) => {
		dispatch({
			type: SHOW_SNACK,
			payload: msg
		})
	}

	const hideSnack = () => {
		dispatch({
			type: HIDE_SNACK,
			payload: ''
		})
	}

	return (
		<SnackContext.Provider
			value={{
				snackOpen: state.snackOpen,
				snackMsg: state.snackMsg,
				showSnack,
				hideSnack
			}}
		>
			{children}
		</SnackContext.Provider>
	)
}
