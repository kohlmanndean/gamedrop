import { useMetaMask } from 'metamask-react'

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
			<div className='inline-block py-2 px-4 border border-green-400 rounded-full text-base font-medium text-green-400 hover:bg-opacity-75'>
				{account.slice(0, 6)}...{account.slice(account.length - 3)}
			</div>
		)
	}
	return (
		<header className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
			<div className='w-full py-6 flex items-center justify-between'>
				<a className='flex items-center space-x-1' href='/'>
					<img className='h-8 w-auto' src='/drop.png' alt='Drop Logo' />
					<h1 className='text-2xl  text-day'>GameDrop</h1>
				</a>
				<nav className='flex space-x-4'>
					<a href='/' className='text-day'>
						Vault
					</a>
					<a href='/' className='text-day'>
						Prizes
					</a>
					<a href='/' className='text-day'>
						Winners
					</a>
				</nav>

				<div className='flex items-center space-x-4'>
					<img className='h-8 w-auto' src='/eth-logo.png' alt='Ethereum Logo' />
					{connectButton}
				</div>
			</div>
		</header>
	)
}
