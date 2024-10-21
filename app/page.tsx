import { getTodosAction } from "@/actions/todo.actions";
import TodoForm from "@/components/TodoForm";
import { TodosTable } from "@/components/TodosTable";

export default async function Home() {
  const todos = await getTodosAction();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TodoForm />
      <TodosTable todos={todos} />
    </div>
  );
}
