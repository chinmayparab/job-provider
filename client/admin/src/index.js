import React from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { AuthProvider } from './context/authContext/authContext'
import { JobProvider } from './context/jobContext/jobContext'

ReactDOM.render(
	<AuthProvider>
		<JobProvider>
			<App />
		</JobProvider>
	</AuthProvider>,
	document.getElementById('root')
)

serviceWorker.unregister()
