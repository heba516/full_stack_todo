import { getTodosAction } from "@/actions/todo.actions";
import TodoForm from "@/components/TodoForm";
import { TodosTable } from "@/components/TodosTable";

export default async function Home() {
  const todos = await getTodosAction();
  return (
    <div className="my-4 p-1 lg:p-16 text-center space-y-8 font-[family-name:var(--font-geist-sans)]">
      {/* grid grid-rows-[20px_1fr_20px] items-center justify-items-center
      min-h-screen p-8 pb-20 gap-16 sm:p-20 */}
      <TodoForm />
      <TodosTable todos={todos} />
    </div>
  );
}
