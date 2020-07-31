import React from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './i18n'

import { AuthProvider } from './context/authContext/authContext'
import { JobProvider } from './context/jobContext/jobContext'
import { SnackProvider } from './context/snackContext/snackContext'

ReactDOM.render(
	<SnackProvider>
		<AuthProvider>
			<JobProvider>
				<App />
			</JobProvider>
		</AuthProvider>
	</SnackProvider>,
	document.getElementById('root')
)

serviceWorker.unregister()
