import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import NFTContractData from './CoolNFTs.json'
import contractData from './raffle.json'

export default function Prizes() {
	const [NFTs, setNFTs] = useState([])

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const NFTContract = new ethers.Contract(NFTContractData.address, NFTContractData.abi, signer)
		const raffleContract = new ethers.Contract(contractData.address, contractData.abi, signer)

		const vaultNFT = async () => {
			await NFTContract.approve(contractData.address, 5)
			await raffleContract.vaultNFT(NFTContractData.address, 5, { gasLimit: 210000 })
		}
		const getNFTs = async () => {
			const nfts = await raffleContract.queryFilter('NFTVaulted')

			setNFTs(
				nfts.filter((nft) => {
					return nft.removed === false
				})
			)
		}

		getNFTs()
		// vaultNFT()
	}, [])

	return (
		<ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{NFTs?.map((nft) => (
				<li key={nft.blockHash} className='col-span-1 p-2 flex flex-col text-center bg-night-light rounded-2xl border border-day overflow-hidden'>
					<div className='flex-1 flex flex-col'>
						<img className=' rounded-lg' src='https://picsum.photos/300/300' alt='' />
					</div>
					<div className='p-8'>
						<h3 className='text-day text-sm font-medium'>{nft.blockNumber}</h3>
						<dl className='mt-1 flex-grow flex flex-col justify-between'>
							<dd className='text-gray-500 text-sm'>{nft.title}</dd>
						</dl>
					</div>
				</li>
			))}
		</ul>
	)
}
