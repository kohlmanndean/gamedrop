import Countdown, { zeroPad } from 'react-countdown'

export default function Counter() {
	return (
		<Countdown
			date={Date.now() + 1000000000}
			intervalDelay={0}
			precision={3}
			renderer={(props) => (
				<div className='grid grid-cols-4 justify-center gap-5 h-6 mx-auto'>
					<div className='space-y-1'>
						<p className='text-2xl text-day text-center'>{zeroPad(props.days)}</p>
						<p className='text-sm text-day text-center'>DAY</p>
					</div>
					<div className='space-y-1'>
						<p className='text-2xl text-day text-center'>{zeroPad(props.hours)}</p>
						<p className='text-sm text-day text-center'>HR</p>
					</div>
					<div className='space-y-1'>
						<p className='text-2xl text-day text-center'>{zeroPad(props.minutes)}</p>
						<p className='text-sm text-day text-center'>MIN</p>
					</div>
					<div className='space-y-1'>
						<p className='text-2xl text-day text-center'>{zeroPad(props.seconds)}</p>
						<p className='text-sm text-day text-center'>SEC</p>
					</div>
				</div>
			)}
		/>
	)
}
