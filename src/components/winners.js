import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractData from './raffle.json'
import moment from 'moment'

export default function Winners() {
	const [winners, setWinners] = useState([])
	const etherscan = (address) => {
		return `https://kovan.etherscan.io/address/${address}`
	}

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const raffleContract = new ethers.Contract(contractData.address, contractData.abi, signer)

		const getWinners = async () => {
			setWinners(await raffleContract.queryFilter('raffleCompleted'))
		}

		getWinners()
	}, [])

	console.log(winners)
	return (
		<div className='grid grid-cols-1 gap-x-8 gap-y-8 p-6 border border-day bg-night-light rounded-3xl'>
			<div className='flex items-center justify-center sm:justify-start space-x-4 w-full'>
				<div className='relative'>
					<img src='/ygg-logo.png' alt='YGG Logo' className='w-10' />
					<img src='/eth-logo.png' alt='YGG Logo' className='w-5 absolute -bottom-1 -right-1 ' />
				</div>
				<h1 className='text-day text-xl'>Yield Guild Prize Pool Winners</h1>
			</div>

			<div className='flex flex-col'>
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='overflow-hidden'>
							<table className='min-w-full divide-y divide-day'>
								<thead className=''>
									<tr>
										<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-day uppercase tracking-wider'>
											Date
										</th>
										<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-day uppercase tracking-wider'>
											Winner
										</th>
										<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-day uppercase tracking-wider'>
											Prize
										</th>
										<th scope='col' className='px-6 py-3 text-left text-xs font-medium text-day uppercase tracking-wider'>
											Value
										</th>
										<th scope='col' className='relative px-6 py-3'>
											<span className='sr-only'>Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-day'>
									{winners.map((winner) => (
										<tr key={winner.address}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm font-medium text-day'>{moment.unix(winner.args['time'].toNumber()).format('YYYY-MM-DD')}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<a href={etherscan(winner.args['winner'])} target='_blank' rel='noreferrer' className='text-day text-sm font-medium truncate'>
													{`${winner.args['winner'].slice(0, 6)}...${winner.args['winner'].slice(winner.args['winner'].length - 3)} `}
													<span>
														<svg xmlns='http://www.w3.org/2000/svg' className='inline-block h-4 w-4 mb-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
															<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
														</svg>
													</span>
												</a>
												<div className='text-sm text-gray-500'>{winner.department}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>Active</span>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{winner.role}</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<a href='#' className='text-day'>
													Claim
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
