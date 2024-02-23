import { auth } from '@/firebase'
import { useUserState } from '@/stores/user-store'
import { ReactNode, useEffect, useState } from 'react'
import FillLoading from '../shared/fill-loading'

function AuthProvider({ children }: { children: ReactNode }) {
	const { setUser } = useUserState()

	const [isLoading, setIsLoding] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
			setIsLoding(false)
		})
	}, [])
	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
