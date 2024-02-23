import { Button } from '@/components/ui/button'
import { featuredItems, programs } from '@/constants'
import men from '@/assets/men.png'
import { Card } from '@/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useUserState } from '@/stores/user-store'
import { CgGym } from 'react-icons/cg'
function Home() {
	const { user } = useUserState()
	return (
		<>
			<div className='w-full h-screen flex items-center '>
				<div className='max-w-xl  md:ml-40 ml-20  xl:ml-60 h-full flex flex-col justify-center'>
					<h1 className='text-4xl md:text-6xl  lg:text-9xl font-semibold uppercase'>
						{' '}
						Workout with me
					</h1>
					<p className='text-muted-foreground'>
						{' '}
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Consequatur veritatis ea aspernatur id, accusantium eum tempore
						corporis persp
					</p>
					{user ? (
						<div className='flex gap-4'>
							<Link to={'/dashboard'}>
								<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
									<span>Go to gym </span>
									<CgGym className='h-5 w-5 ml-2		' />
								</Button>
							</Link>
						</div>
					) : (
						<Link to={'/auth'}>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								Join club now
							</Button>
						</Link>
					)}
					<div className='mt-24'>
						<p className='flex text-muted-foreground '>AS featured IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>

				<img src={men} alt='' className=' w-1/2 md:w-1/4 lg:w-1/8' />
			</div>
			<div className=' max-auto container max-w-5xl'>
				<h1 className='text-4xl'> Not sure where to start</h1>
				<p className='mt-2 text-muted-foreground'>
					Progeams offer day-to-day guidance on an interactive to keep you on
					track.
				</p>
				<div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
					{programs.map(item => (
						<Card
							key={item.title}
							className='p-8 relative cursor-pointer mt-2 group'
						>
							<h3>{item.title}</h3>
							<p className='text-sm text-muted-foreground mt-2'>{item.descr}</p>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
