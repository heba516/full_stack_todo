'use server'

import { todoFormValues } from '@/schema';
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';
  
const prisma = new PrismaClient()

export const getUserTodosAction = async ({userId}:{userId: string | null}) => {
    return prisma.todo.findMany({
        where: {
            user_id: userId as string
        },
        orderBy: {
            createdAt: "desc"
        }
    })
};
export const createTodoAction = async ({data, userId}: {data:todoFormValues, userId: string | null}) => {
    
    await prisma.todo.create({
        data: {
            user_id: userId as string,
            ...data,
        }
    })
    revalidatePath("/");
};
export const updateTodoAction = async (id : string, data: todoFormValues) => {
    await prisma.todo.update({
        where: {
            id
        }, 
        data: {
            title: data.title,
            body: data.body,
            compeleted: data.compeleted
        }
    })
    revalidatePath("/");
};
export const deleteTodoAction = async ({id} : {id : string}) => {
    await prisma.todo.delete({
        where: {
            id
        }
    })
    revalidatePath("/");
};