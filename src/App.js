import Header from './components/header'
import Vault from './components/vault'
import Footer from './components/footer'
import { ethers } from 'ethers'
import abi from 'erc-20-abi'
import { useEffect, useState } from 'react'
import { formatUnits } from '@ethersproject/units'

function App() {
	const [balance, setBalance] = useState(0)
	const [token, setToken] = useState(null)

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const address = '0x25f8087ead173b73d6e8b84329989a8eea16cf73' //window.ethereum.selectedAddress
		const erc20_rw = address ? new ethers.Contract(address, abi, provider) : null
		async function getTokenData() {
			setBalance(
				await erc20_rw.balanceOf(address).then((res) => {
					return parseFloat(formatUnits(res._hex)).toFixed(2)
				})
			)
			setToken(await erc20_rw.symbol())
		}
		if (address) {
			getTokenData()
		}
	})
	return (
		<div className='flex flex-col h-full'>
			<Header />
			<Vault token={token} balance={balance} />
			<Footer />
		</div>
	)
}

export default App
