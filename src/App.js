import Layout from './components/Layout/Layout'
import Vault from './components/vault'
import raffle from './components/raffle'
import tokenData from './components/tokenData.json'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { formatUnits } from '@ethersproject/units'
import { Route, Routes } from 'react-router-dom'

function App() {
	const [balance, setBalance] = useState(0)
	const [token, setToken] = useState({})
	const [contract, setContract] = useState()
	const [signer, setSigner] = useState()

	const routes = [
		{ name: 'Vault', path: '/', element: <Vault signer={signer} contract={contract} token={token} balance={balance} /> },
		{ name: 'Prizes', path: '/prizes', element: '' },
		{ name: 'Winners', path: 'winners', element: '' },
	]

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()

		async function getUserBalance() {
			const tokenContract = new ethers.Contract(tokenData.address, tokenData.abi, signer)
			let userAddress = await signer.getAddress()
			setBalance(
				await tokenContract.balanceOf(userAddress).then((res) => {
					return formatUnits(res._hex, 'wei')
				})
			)
			setToken({
				contract: tokenContract,
				symbol: await tokenContract.symbol(),
			})
		}
		async function getRaffleContract() {
			const raffleContract = signer ? new ethers.Contract(raffle.address, raffle.abi, signer) : null

			setContract(raffleContract)
		}
		if (signer) {
			getUserBalance()
			getRaffleContract()
			setSigner(signer)
		}
	}, [])
	return (
		<Layout routes={routes}>
			<Routes>
				{routes.map((route) => {
					return <Route key={route.name} path={route.path} element={route.element}></Route>
				})}
			</Routes>
		</Layout>
	)
}

export default App
