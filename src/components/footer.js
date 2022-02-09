import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Footer() {
	return (
		<footer className='max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-center space-x-4'>
			<a href='https://github.com/andrepn/gamedrop' target='_blank' rel='noreferrer'>
				<FontAwesomeIcon icon={brands('github')} alt='Github' className='h-6 w-auto text-day' />
			</a>
			<a href='/' target='_blank' rel='noreferrer'>
				<FontAwesomeIcon icon={brands('twitter')} alt='Twitter' className='h-6 w-auto text-day' />
			</a>
			<a href='https://discord.gg/F7UdDchd' target='_blank' rel='noreferrer'>
				<FontAwesomeIcon icon={brands('discord')} alt='Discord' className='h-6 w-auto text-day' />
			</a>
		</footer>
	)
}
