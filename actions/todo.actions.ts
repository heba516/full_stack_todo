'use server'

import { todoFormValues } from '@/schema';
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache';
  
const prisma = new PrismaClient()

export const getTodosAction = async () => {
    return prisma.todo.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
};
export const createTodoAction = async (data: todoFormValues) => {
    await prisma.todo.create({
        data: {
            ...data
        }
    })
    revalidatePath("/");
};
export const updateTodoAction = async () => { };
export const deleteTodoAction = async ({id} : {id : string}) => {
    await prisma.todo.delete({
        where: {
            id
        }
    })
    revalidatePath("/");
};