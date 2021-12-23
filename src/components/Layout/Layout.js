import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Layout({ children, routes }) {
	return (
		<div className='flex flex-col h-full'>
			<Router>
				<Header routes={routes} />
				<main className='flex justify-center items-center h-full'>{children}</main>
				<Footer />
			</Router>
		</div>
	)
}
