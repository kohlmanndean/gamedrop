import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
// import NFTContractData from './CoolNFTs.json'
import contractData from './raffle.json'

export default function Prizes() {
	const [NFTs, setNFTs] = useState([])

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		// const NFTContract = new ethers.Contract(NFTContractData.address, NFTContractData.abi, signer)
		const raffleContract = new ethers.Contract(contractData.address, contractData.abi, signer)

		const getNFTs = async () => {
			const nfts = await raffleContract.queryFilter('NFTVaulted')

			setNFTs(
				nfts.filter((nft) => {
					return nft.removed === false
				})
			)
			console.log(NFTs)
		}

		getNFTs()
	}, [])

	return (
		<div className='p-6 border border-day bg-night-light rounded-3xl grid grid-cols-1 gap-8'>
			<div className='flex items-center justify-center sm:justify-start space-x-4 w-full'>
				<div className='relative'>
					<img src='/ygg-logo.png' alt='YGG Logo' className='w-10' />
					<img src='/eth-logo.png' alt='YGG Logo' className='w-5 absolute -bottom-1 -right-1 ' />
				</div>
				<h1 className='text-day text-xl'>Yield Guild Prize Pool Prizes</h1>
			</div>
			<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 '>
				{NFTs?.map((nft) => (
					<li key={nft.blockNumber} className='relative space-y-3 p-4 border border-day rounded-2xl'>
						<img src={'https://picsum.photos/300/200'} alt='' className='block w-full rounded-lg' />
						<div className='px-2'>
							<p className='block text-sm font-medium text-day truncate pointer-events-none'>Address: {nft.blockHash}</p>
							<p className='block text-sm font-medium text-day truncate pointer-events-none'>Token ID: {nft.id}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
