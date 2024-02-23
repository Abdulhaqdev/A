import { z } from 'zod'

export const loginScema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const registerchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confiromPassword: z.string(),
	})
	.refine(data => data.password === data.confiromPassword, {
		message: 'Password do not match',
		path: ['confiromPassword'],
	})

export const taskSchema = z.object({
	title: z.string().min(5),
})
