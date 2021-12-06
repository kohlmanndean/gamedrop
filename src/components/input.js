import { useState } from 'react'

export default function Input({ balance, token }) {
	const [value, setValue] = useState('')
	const handleClick = () => {
		setValue(balance)
	}

	return (
		<div className='relative rounded-full shadow-sm'>
			<p className='text-right text-day text-sm absolute -mt-6 right-4 '>available: {balance}</p>
			<div className='absolute inset-y-0 left-0 pl-3 flex items-center space-x-1 pointer-events-none'>
				<img src='/ygg-logo.png' alt='YGG Logo' className='w-5' />
				<span className='text-day text-sm'>YGG</span>
			</div>
			<input
				type='number'
				value={value}
				max={balance}
				onChange={(ev) => {
					setValue(ev.target.value)
				}}
				className='bg-transparent  text-day placeholder-day placeholder-opacity-50 focus:ring-day focus:border-day block w-full pl-20 pr-12 sm:text-sm border-day rounded-full'
				placeholder='0.00'
				disabled={token !== 'YGG'}
				aria-describedby='price-currency'
			/>
			<div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
				<button onClick={handleClick} className='text-day sm:text-sm'>
					max
				</button>
			</div>
		</div>
	)
}
