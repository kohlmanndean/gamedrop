import Counter from './counter'
import { ethers } from 'ethers'

export default function Vault() {
	const provider = new ethers.providers.Web3Provider(window.ethereum)

	return (
		<main className='flex justify-center items-center h-full'>
			<div className='grid grid-cols-2 gap-8 gap-y-10 border p-6 border-day bg-night-light rounded-3xl'>
				<div className='flex items-center space-x-4'>
					<div className='relative'>
						<img src='/ygg-logo.png' alt='YGG Logo' className='w-10' />
						<img src='/eth-logo.png' alt='YGG Logo' className='w-5 absolute -bottom-1 -right-1 ' />
					</div>
					<h1 className='text-day text-xl'>Yield Guild Prize Pool</h1>
				</div>

				<Counter />

				<div className='flex flex-col space-y-1 relative'>
					<p className='text-right text-day text-sm absolute -mt-6 right-4 '>available balance</p>
					<div href='/' className='flex justify-between py-2 px-4 border border-day rounded-full text-sm font-medium text-day w-full'>
						<div className='flex items-center space-x-2'>
							<img src='/ygg-logo.png' alt='YGG Logo' className='w-5 -ml-2' />
							<p>YGG</p>
						</div>
						<p>max</p>
					</div>
				</div>

				<div className='flex items-center space-x-4'>
					<a href='/' className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full'>
						Approve
					</a>
					<a href='/' className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full'>
						Deposit
					</a>
				</div>
			</div>
		</main>
	)
}
