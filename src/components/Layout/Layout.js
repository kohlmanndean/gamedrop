import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Layout({ children, routes, metamask }) {
	return (
		<div className='flex flex-col h-full overflow-hidden'>
			<Router>
				<Header className='z-50' routes={routes} metamask={metamask} />
				<main className='flex justify-center items-center h-full p-6'>{children}</main>
				<Footer />
			</Router>
		</div>
	)
}
