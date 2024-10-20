'use server'

import { todoFormValues } from '@/schema';
import { PrismaClient } from '@prisma/client'
  
const prisma = new PrismaClient()

export const getTodosAction = async () => {
    return prisma.todo.findMany()
};
export const createTodoAction = async (data: todoFormValues) => {
    await prisma.todo.create({
        data: {
            ...data
        }
    })
};
export const updateTodoAction = async () => { };
export const deleteTodoAction = async () => { };