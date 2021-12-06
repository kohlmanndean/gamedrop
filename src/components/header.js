import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useMetaMask } from 'metamask-react'

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
	{ name: 'Vault', href: '#', current: true },
	{ name: 'Prizes', href: '#', current: false },
	{ name: 'Winners', href: '#', current: false },
]
const userNavigation = []

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Header() {
	let connectButton
	const { status, account, connect } = useMetaMask()
	if (status !== 'connected') {
		connectButton = (
			<button onClick={connect} className='inline-block py-2 px-4 border border-day rounded-full text-base font-medium text-day hover:bg-opacity-75'>
				Connect Wallet
			</button>
		)
	} else {
		connectButton = (
			<div className='flex items-center space-x-2 py-2 px-4 border border-green-400 rounded-full text-base font-medium text-green-400 hover:bg-opacity-75'>
				<div className='w-2 h-2 rounded-full bg-green-400 shadow-xl'></div>
				<p>
					{account.slice(0, 6)}...{account.slice(account.length - 3)}
				</p>
			</div>
		)
	}
	return (
		<Disclosure as='nav' className='bg-night'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex justify-between h-16'>
							<div className='flex'>
								<div className='-ml-2 mr-2 flex items-center md:hidden'>
									{/* Mobile menu button */}
									<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='sr-only'>Open main menu</span>
										{open ? <XIcon className='block h-6 w-6' aria-hidden='true' /> : <MenuIcon className='block h-6 w-6' aria-hidden='true' />}
									</Disclosure.Button>
								</div>
								<div className='flex-shrink-0 flex items-center space-x-2'>
									<img className='block h-8 w-auto' src='drop.png' alt='GameDrop' />
									<h1 className='block text-2xl text-day'>GameDrop</h1>
								</div>
								<div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
									{navigation.map((item) => (
										<a key={item.name} href={item.href} className={classNames(item.current ? 'bg-gray-900 text-day' : 'text-day hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
											{item.name}
										</a>
									))}
								</div>
							</div>
							<div className='flex items-center'>
								<div className='flex-shrink-0'>{connectButton}</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
							{navigation.map((item) => (
								<Disclosure.Button key={item.name} as='a' href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
						<div className='pt-4 pb-3 border-t border-gray-700'>
							<div className='flex items-center px-5 sm:px-6'>
								<div className='flex-shrink-0'>
									<img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' />
								</div>
								<div className='ml-3'>
									<div className='text-base font-medium text-white'>{user.name}</div>
									<div className='text-sm font-medium text-gray-400'>{user.email}</div>
								</div>
							</div>
							<div className='mt-3 px-2 space-y-1 sm:px-3'>
								{userNavigation.map((item) => (
									<Disclosure.Button key={item.name} as='a' href={item.href} className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

// export default function Header() {
// 	let connectButton
// 	const { status, account, connect } = useMetaMask()
// 	if (status !== 'connected') {
// 		connectButton = (
// 			<button onClick={connect} className='inline-block py-2 px-4 border border-day rounded-full text-base font-medium text-day hover:bg-opacity-75'>
// 				Connect Wallet
// 			</button>
// 		)
// 	} else {
// 		connectButton = (
// 			<div className='inline-block py-2 px-4 border border-green-400 rounded-full text-base font-medium text-green-400 hover:bg-opacity-75'>
// 				{account.slice(0, 6)}...{account.slice(account.length - 3)}
// 			</div>
// 		)
// 	}
// 	return (
// 		<header className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
// 			<div className='w-full py-6 flex items-center justify-between'>
// 				<a className='flex items-center space-x-1' href='/'>
// 					<img className='h-8 w-auto' src='/drop.png' alt='Drop Logo' />
// 					<h1 className='text-2xl  text-day'>GameDrop</h1>
// 				</a>
// 				<nav className='flex space-x-4'>
// 					<a href='/' className='text-day'>
// 						Vault
// 					</a>
// 					<a href='/' className='text-day'>
// 						Prizes
// 					</a>
// 					<a href='/' className='text-day'>
// 						Winners
// 					</a>
// 				</nav>

// 				<div className='flex items-center space-x-4'>
// 					<img className='h-8 w-auto' src='/eth-logo.png' alt='Ethereum Logo' />
// 					{connectButton}
// 				</div>
// 			</div>
// 		</header>
// 	)
// }
