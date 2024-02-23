import { Skeleton } from '../ui/skeleton'
import { LuLoader2 } from 'react-icons/lu'

function FillLoading() {
	return (
		<Skeleton className='absolute inset-0 flex justify-center items-center w-full h-full opacity-20 z-50'>
			<LuLoader2 className='animate-spin w-8 h-8' />
		</Skeleton>
	)
}

export default FillLoading
