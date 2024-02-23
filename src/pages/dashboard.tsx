import TaskForm from '@/components/forms/task-form'
import FillLoading from '@/components/shared/fill-loading'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/valaditions'
import { TaskServise } from '@/servise/task.servise'
import { useUserState } from '@/stores/user-store'
import { ITask } from '@/types/index'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { useState } from 'react'
import { LuBadgePlus } from 'react-icons/lu'
import { RiAlertLine } from 'react-icons/ri'
import { toast } from 'sonner'
import { z } from 'zod'

const Dashboard = () => {
	const [isEditing, setEditing] = useState(false)
	const [isDelete, setDelete] = useState(false)
	const [currentTask, setCurrnetTask] = useState<ITask | null>(null)
	const [open, setOpen] = useState(false)
	const { user } = useUserState()

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskServise.getTasks,
	})
	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}
	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		if (!currentTask) return null

		const ref = doc(db, 'tasks', currentTask.id)

		return updateDoc(ref, {
			title,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}

	const onDelete = async (id: string) => {
		setDelete(true)
		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setDelete(false))

		toast.promise(promise, {
			loading: 'loading...',
			success: 'Succesfully deleted',
			error: 'Someting went  worng',
		})
	}
	const onStartEditing = (task: ITask) => {
		setEditing(true)
		setCurrnetTask(task)
	}

	const getFormatDate = (time: number) => {
		const date = addMilliseconds(new Date(0), time)
		const formattedDate = format(
			addMinutes(date, date.getTimezoneOffset()),
			'HH:mm:ss'
		)
		return formattedDate
	}
	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center max-md:px-6 max-md:pt-[8vh]'>
				<div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-8 items-center'>
					<div className='flex flex-col space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button
								size={'icon'}
								onClick={() => {
									setOpen(true)
								}}
							>
								<LuBadgePlus />
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60 '>
							{(isPending || isDelete) && <FillLoading />}
							{error && (
								<Alert variant='destructive' className='w-full'>
									<RiAlertLine className='h-4 w-4' />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>{error.message}</AlertDescription>
								</Alert>
							)}
							{data && (
								<div className='flex flex-col space-y-3 w-full'>
									{!isEditing &&
										data.tasks.map(task => (
											<TaskItem
												key={task.id}
												task={task}
												onDelete={() => onDelete(task.id)}
												onStartEditing={() => onStartEditing(task)}
												refetch={refetch}
											/>
										))}
									{isEditing && (
										<TaskForm
											title={currentTask?.title}
											isEdit
											handler={
												onUpdate as (
													values: z.infer<typeof taskSchema>
												) => Promise<void | null>
											}
											onClose={() => setEditing(false)}
										/>
									)}
								</div>
							)}
						</div>
					</div>
					<div className='flex flex-col space-y-3 relative w-full'>
						<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							{isPending ? (
								<FillLoading />
							) : (
								data && (
									<>
										<div className='text-3xl font-bold'>
											{getFormatDate(data?.weekTotal)}
										</div>
									</>
								)
							)}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
							<div className='text-2xl font-bold'>Total month</div>
							{isPending ? (
								<FillLoading />
							) : (
								data && (
									<>
										<div className='text-3xl font-bold'>
											{getFormatDate(data?.monthTotal)}
										</div>
									</>
								)
							)}{' '}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
							<div className='text-2xl font-bold'>Total time</div>
							{isPending ? (
								<FillLoading />
							) : (
								data && (
									<>
										<div className='text-3xl font-bold'>
											{getFormatDate(data?.total)}
										</div>
									</>
								)
							)}{' '}
						</div>
					</div>
				</div>
			</div>{' '}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm
						handler={
							onAdd as (
								values: z.infer<typeof taskSchema>
							) => Promise<void | null>
						}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
