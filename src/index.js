import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Kovan, DAppProvider } from '@usedapp/core'
import App from './App'
import reportWebVitals from './reportWebVitals'

const config = {
	readOnlyChainId: Kovan.chainId,
	readOnlyUrls: {
		[Kovan.chainId]: `https://kovan.infura.io/v3/8d22b907e62a4ec99ec995df915a4e7e`,
	},
}

ReactDOM.render(
	<React.StrictMode>
		<DAppProvider config={config}>
			<App />
		</DAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
