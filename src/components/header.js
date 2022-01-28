import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { shortenAddress, useEthers } from '@usedapp/core'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Header({ routes, account }) {
	const { activateBrowserWallet } = useEthers()

	let connectButton

	if (!account) {
		connectButton = (
			<button onClick={activateBrowserWallet} className='inline-block py-2 px-4 border border-day rounded-full text-base font-medium text-day hover:bg-opacity-75'>
				Connect Wallet
			</button>
		)
	} else {
		connectButton = <div className='flex items-center py-2 px-4 border border-green-400 rounded-full text-base font-medium text-green-400 hover:bg-opacity-75'>{shortenAddress(account)}</div>
	}
	return (
		<Disclosure as='nav' className='bg-night absolute top-0 w-full'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50'>
						<div className='flex justify-between h-16'>
							<div className='flex'>
								<div className='-ml-2 mr-2 flex items-center md:hidden'>
									{/* Mobile menu button */}
									<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='sr-only'>Open main menu</span>
										{open ? <XIcon className='block h-6 w-6' aria-hidden='true' /> : <MenuIcon className='block h-6 w-6' aria-hidden='true' />}
									</Disclosure.Button>
								</div>
								<div className='flex-shrink-0 flex items-center space-x-1'>
									<img className='block h-8 w-auto' src='drop.png' alt='GameDrop' />
									<h1 className='block text-2xl text-day'>GameDrop</h1>
								</div>
								<div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
									{routes.map((route) => (
										<CustomLink route={route} key={route.name} />
									))}
								</div>
							</div>
							<div className='flex items-center'>
								<div className='flex-shrink-0'>{connectButton}</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='md:hidden shadow-lg rounded-b-lg h-full z-50'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							{routes.map((route) => (
								<CustomLink route={route} key={route.name} />
							))}
						</div>
					</Disclosure.Panel>
					{/* {open ? <div className='relative h-screen w-screen bg-black opacity-50 z-10'></div> : null} */}
				</>
			)}
		</Disclosure>
	)
}

function CustomLink({ route }) {
	let resolved = useResolvedPath(route.path)
	let match = useMatch({ path: resolved.pathname, end: true })
	return (
		<Disclosure.Button className={classNames(match ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'flex w-full rounded-md text-base font-medium')}>
			<Link className='min-w-full text-left px-3 py-2' to={route.path}>
				{route.name}
			</Link>
		</Disclosure.Button>
	)
}
