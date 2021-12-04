export default function Counter() {
	return (
		<div className='flex justify-center space-x-4 h-6 mt-2'>
			<div className='space-y-1'>
				<div className='flex space-x-1 h-6'>
					<div className='border border-day rounded-md p-2'></div>
					<div className='border border-day rounded-md p-2'></div>
				</div>
				<p className='text-sm text-day text-center'>DAY</p>
			</div>
			<div className='space-y-1'>
				<div className='flex space-x-1 h-6'>
					<div className='border border-day rounded-md p-2'></div>
					<div className='border border-day rounded-md p-2'></div>
				</div>
				<p className='text-sm text-day text-center'>HR</p>
			</div>
			<div className='space-y-1'>
				<div className='flex space-x-1 h-6'>
					<div className='border border-day rounded-md p-2'></div>
					<div className='border border-day rounded-md p-2'></div>
				</div>
				<p className='text-sm text-day text-center'>MIN</p>
			</div>
			<div className='space-y-1'>
				<div className='flex space-x-1 h-6'>
					<div className='border border-day rounded-md p-2'></div>
					<div className='border border-day rounded-md p-2'></div>
				</div>
				<p className='text-sm text-day text-center'>SEC</p>
			</div>
		</div>
	)
}
