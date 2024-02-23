import { auth } from '@/firebase/index'
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import FillLoading from '../shared/fill-loading'

function Social() {
	const [isLoading, setIsloding] = useState(false)
	const navigate = useNavigate()
	const onGithub = () => {
		setIsloding(true)
		const githubProvider = new GithubAuthProvider()
		signInWithPopup(auth, githubProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsloding(false)
			})
	}
	const onGoogle = () => {
		setIsloding(true)
		const googleProvider = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsloding(false)
			})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-2'>
				<Button
					className='h-12'
					variant={'secondary'}
					onClick={onGithub}
					disabled={isLoading}
				>
					<FaGithub className='mr-2' /> <span> Sign in with Github</span>
				</Button>
				<Button
					className='h-12'
					variant={'destructive'}
					disabled={isLoading}
					onClick={onGoogle}
				>
					<FaGoogle className='mr-2' />
					<span> Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
