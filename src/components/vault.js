import Counter from './counter'
import Input from './input'

export default function Vault({ token, balance }) {
	return (
		<main className='flex justify-center items-center h-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 gap-y-10 border p-6 border-day bg-night-light rounded-3xl'>
				<div className='flex items-center space-x-4'>
					<div className='relative'>
						<img src='/ygg-logo.png' alt='YGG Logo' className='w-10' />
						<img src='/eth-logo.png' alt='YGG Logo' className='w-5 absolute -bottom-1 -right-1 ' />
					</div>
					<h1 className='text-day text-xl'>Yield Guild Prize Pool</h1>
				</div>

				<Counter />
				<Input token={token} balance={balance} />

				<div className='flex items-center space-x-4'>
					<button disabled={token !== 'YGG'} className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full disabled:opacity-50'>
						Approve
					</button>
					<button disabled={token !== 'YGG'} className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full disabled:opacity-50'>
						Deposit
					</button>
				</div>
			</div>
		</main>
	)
}
