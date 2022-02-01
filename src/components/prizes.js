import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import NFTContractData from './CoolNFTs.json'
import raffle from './raffle.json'
import { OpenSeaPort, Network } from 'opensea-js'
import { useEthers } from '@usedapp/core'

export default function Prizes() {
	const { library } = useEthers()
	const [NFTs, setNFTs] = useState([])

	useEffect(() => {
		const raffleContract = new ethers.Contract(raffle.address, raffle.abi, library)
		// const NFTContract = new ethers.Contract(NFTContractData.address, NFTContractData.abi, provider)

		const getNFTs = async () => {
			const nfts = await raffleContract.queryFilter('NFTVaulted')

			setNFTs(
				nfts.filter((nft) => {
					return nft.removed === false
				})
			)
		}

		if (library) {
			getNFTs()
		}
	}, [library])

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
					<PrizeItem key={nft.blockHash} nft={nft} provider={library} />
				))}
			</ul>
		</div>
	)
}

function PrizeItem({ nft, provider }) {
	const [NFT, setNFT] = useState({})

	useEffect(() => {
		const getNFT = async () => {
			const contract = new ethers.Contract(nft.args['nft_contract'], NFTContractData.abi, provider)
			setNFT({
				contract: contract,
				name: await contract.name(),
				address: nft.args.nft_contract,
				id: nft.args.token_id,
			})
		}
		getNFT()
	}, [nft, provider])

	const etherscan = {
		url: 'https://kovan.etherscan.io',
		addressURL(address) {
			return `${etherscan.url}/address/${address}`
		},
		tokenURL({ address, id }) {
			return `${etherscan.url}/token/${address}${id ? `?a=${id}` : ''}`
		},
	}
	return (
		<li className='relative space-y-3 p-4 border border-day rounded-2xl'>
			<img src={'https://picsum.photos/300/200'} alt='' className='block w-full rounded-lg' />
			<div className='px-2'>
				<a href={etherscan.tokenURL({ address: NFT.address, id: NFT.id })} target='_blank' rel='noreferrer' className='text-day text-sm font-medium'>
					{`${NFT.name} #${NFT.id} `}
					<span>
						<svg xmlns='http://www.w3.org/2000/svg' className='inline-block h-4 w-4 mb-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
						</svg>
					</span>
				</a>
			</div>
		</li>
	)
}
