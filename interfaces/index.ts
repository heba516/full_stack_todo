export interface Todo {
    id: string;
    title: string;
    body?: string | null;
    compeleted: boolean;
    createdAt: Date;
}