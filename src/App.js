import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter as Router } from 'react-router-dom'
import Vault from './components/vault'
import Prizes from './components/prizes'
import Winners from './components/winners'
import { Route, Routes } from 'react-router-dom'
import { useEthers } from '@usedapp/core'

export default function App() {
	const { account } = useEthers()

	const routes = [
		{
			name: 'Vault',
			path: '/',
			element: <Vault account={account} />,
		},
		{
			name: 'Prizes',
			path: '/prizes',
			element: <Prizes />,
		},
		{
			name: 'Winners',
			path: 'winners',
			element: <Winners />,
		},
	]

	return (
		<div className='flex flex-col h-full overflow-hidden'>
			<Router>
				<Header className='z-50' routes={routes} account={account} />
				<main className='flex justify-center items-center h-full p-6'>
					<Routes>
						{routes.map((route) => {
							return <Route key={route.name} path={route.path} element={route.element}></Route>
						})}
					</Routes>
				</main>
				<Footer />
			</Router>
		</div>
	)
}
