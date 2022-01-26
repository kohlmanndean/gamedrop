import Layout from './components/Layout/Layout'
import Vault from './components/vault'
import Prizes from './components/prizes'
import Winners from './components/winners'
import raffle from './components/raffle.json'
import tokenData from './components/tokenData.json'
import { useMetaMask } from 'metamask-react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { formatUnits } from '@ethersproject/units'
import { Route, Routes } from 'react-router-dom'
import { EtherscanProvider } from '@ethersproject/providers'

export default function App() {
	const metamask = useMetaMask()

	const [balance, setBalance] = useState(0)
	const [winningOdds, setWinningOdds] = useState(0)
	const [totalStaked, setTotalStaked] = useState(0)
	const [token, setToken] = useState({})
	const [contract, setContract] = useState()
	const [completedRaffles, setCompletedRaffles] = useState([])

	const routes = [
		{
			name: 'Vault',
			path: '/',
			element: <Vault metamask={metamask} raffleContract={contract} token={token} balance={balance} odds={winningOdds} totalStaked={totalStaked} completedRaffles={completedRaffles} />,
		},
		{
			name: 'Prizes',
			path: '/prizes',
			element: <Prizes />,
		},
		{
			name: 'Winners',
			path: 'winners',
			element: <Winners completedRaffles={completedRaffles} />,
		},
	]

	useEffect(() => {
		const provider = new EtherscanProvider('kovan', 'N5XTQ3J1INIF61TY1QJF2SEK1G75MVAZ9W')
		const tokenContract = new ethers.Contract(tokenData.address, tokenData.abi, provider)
		const raffleContract = new ethers.Contract(raffle.address, raffle.abi, provider)

		const getContractData = async () => {
			setContract(raffleContract)
			setCompletedRaffles(await raffleContract.queryFilter('raffleCompleted'))
			setToken({
				contract: tokenContract,
				symbol: await tokenContract.symbol(),
			})
		}
		const getUserData = async () => {
			setBalance(
				await tokenContract.balanceOf(metamask.account).then((res) => {
					return formatUnits(res._hex, 'wei')
				})
			)
			setWinningOdds(ethers.BigNumber.from(await raffleContract.view_odds_of_winning(window.ethereum.selectedAddress)).toNumber())
			setTotalStaked(ethers.BigNumber.from(await raffleContract.view_raw_balance(window.ethereum.selectedAddress)).toNumber())
		}

		getContractData()

		if (metamask.account) {
			getUserData()
		}
	}, [metamask.account])

	return (
		<Layout routes={routes} metamask={metamask}>
			<Routes>
				{routes.map((route) => {
					return <Route key={route.name} path={route.path} element={route.element}></Route>
				})}
			</Routes>
		</Layout>
	)
}
