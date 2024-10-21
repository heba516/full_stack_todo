import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@/interfaces";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";

export function TodosTable({ todos }: { todos: Todo[] }) {
  return (
    <Table>
      <TableCaption>Your Todo List</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Compeleted</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.body}</TableCell>
            <TableCell>
              {todo.compeleted ? (
                <Badge>Compeleted</Badge>
              ) : (
                <Badge variant="secondary">Uncompeleted</Badge>
              )}
            </TableCell>
            <TableCell>{todo.createdAt.toISOString()}</TableCell>
            <TableCell>
              <TodosTableActions id={todo.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
