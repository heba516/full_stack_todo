import { getUserTodosAction } from "@/actions/todo.actions";
import TodoForm from "@/components/TodoForm";
import { TodosTable } from "@/components/TodosTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const todos = await getUserTodosAction({ userId });

  return (
    <div
      className="grid grid-rows-[1fr_1fr_1fr_1fr] items-center justify-items-center
      min-h-screen p-2 pb-20 gap-4 sm:px-10 font-[family-name:var(--font-geist-sans)]"
    >
      <TodoForm userId={userId} />
      <TodosTable todos={todos} />
    </div>
  );
}
