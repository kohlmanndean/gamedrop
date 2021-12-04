import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MetaMaskProvider } from 'metamask-react'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<React.StrictMode>
		<MetaMaskProvider>
			<App />
		</MetaMaskProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
