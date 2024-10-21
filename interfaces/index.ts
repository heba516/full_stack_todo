export interface Todo {
    id: string;
    title: string;
    body?: string;
    compeleted: boolean;
    createdAt: Date;
}