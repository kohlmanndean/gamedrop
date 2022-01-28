import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import raffle from './raffle.json'
import token from './tokenData.json'
import { formatUnits } from 'ethers/lib/utils'
import Countdown, { zeroPad } from 'react-countdown'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import Input from './input'
import { useContractCalls, useTokenBalance } from '@usedapp/core'

const raffleABI = new ethers.utils.Interface(raffle.abi)
const tokenABI = new ethers.utils.Interface(token.abi)

export default function Vault({ account }) {
	const [tokenBalance, totalStaked, odds] = useContractCalls([
		{ abi: tokenABI, address: token.address, method: 'balanceOf', args: [account || raffle.address] },
		{ abi: raffleABI, address: raffle.address, method: 'view_raw_balance', args: [account || raffle.address] },
		{ abi: raffleABI, address: raffle.address, method: 'view_odds_of_winning', args: [account || raffle.address] },
	])

	const [tokenAmount, setTokenAmount] = useState(0)
	const [countdownTargetDate, setCountdownTargetDate] = useState(1)

	useEffect(() => {
		const completedRaffles = []
		setCountdownTargetDate(
			+moment
				.unix(
					completedRaffles
						.map((raffle) => {
							return raffle.args['time']
						})
						.reduce((a, b) => {
							return b > a ? b : a
						}, 0)
				)
				.add(20, 'days')
		)
	}, [])

	const getTokenAmount = (amount) => {
		setTokenAmount(amount)
	}
	const handleApprove = async () => {
		// await tokenContract.approve(raffleContract.address, parseFloat(tokenAmount) + 1)
	}
	const handleDeposit = async () => {
		// await raffleContract.Deposit(tokenAmount, { gasLimit: 210000 })
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 p-6 border border-day bg-night-light rounded-3xl'>
			<div className='flex items-center justify-center sm:justify-items-start space-x-4 w-full'>
				<div className='relative'>
					<img src='/ygg-logo.png' alt='YGG Logo' className='w-10' />
					<img src='/eth-logo.png' alt='YGG Logo' className='w-5 absolute -bottom-1 -right-1 ' />
				</div>
				<h1 className='text-day text-xl'>Yield Guild Prize Pool</h1>
			</div>

			<Countdown
				date={countdownTargetDate}
				key={countdownTargetDate}
				intervalDelay={0}
				precision={3}
				renderer={(props) => (
					<div className='grid grid-cols-4 justify-center gap-5 mx-auto'>
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

			<UserStats userAddress={account} balance={tokenBalance ? formatUnits(tokenBalance[0], 0) : 0} totalStaked={totalStaked ? formatUnits(totalStaked[0], 0) : 0} odds={odds ? formatUnits(odds[0], 0) : 0} />

			<div className='flex flex-col space-y-6'>
				<Input balance={tokenBalance} tokenAmount={getTokenAmount} />

				<div className='flex items-center space-x-4'>
					<button disabled={tokenAmount <= 0 || tokenAmount === ''} onClick={handleApprove} className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full disabled:opacity-50'>
						Approve
					</button>
					<button disabled={tokenAmount <= 0 || tokenAmount === ''} onClick={handleDeposit} className='inline-block py-2 px-4 border border-day rounded-full text-sm text-center font-medium text-day w-full disabled:opacity-50'>
						Deposit
					</button>
				</div>
			</div>
		</div>
	)
}

function UserStats({ userAddress, balance, totalStaked, odds }) {
	return (
		<div className={`flex-col space-y-2`}>
			<p className='text-day flex justify-between'>
				YGG Available: <NumberFormat value={balance} displayType={'text'} thousandSeparator={true} />
			</p>
			<p className='text-day flex justify-between'>
				Total YGG staked: <NumberFormat value={totalStaked} displayType={'text'} thousandSeparator={true} />
			</p>
			<p className='text-day flex justify-between'>
				Odds of winning:
				<span>
					{`${odds >= 1 ? '1 in' : ''}`} <NumberFormat value={odds} displayType={'text'} thousandSeparator={true} />
				</span>
			</p>
		</div>
	)
}
