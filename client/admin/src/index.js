import React from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { GlobalProvider } from './context/globalContext'

ReactDOM.render(
	<GlobalProvider>
		<App />
	</GlobalProvider>,
	document.getElementById('root')
)

serviceWorker.unregister()
