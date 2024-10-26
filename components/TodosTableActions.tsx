"use client";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteTodoAction } from "@/actions/todo.actions";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import TodoForm from "./TodoForm";
import { Todo } from "@/interfaces";

const TodosTableActions = ({ id, todo }: { id: string; todo: Todo }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-end space-x-2">
      <TodoForm todo={todo} key={todo.id} />
      <Button
        size={"icon"}
        className="bg-red-700 hover:bg-red-800"
        onClick={async () => {
          setLoading(true);
          await deleteTodoAction({ id: id });
          setLoading(false);
        }}
      >
        {loading ? <LoadingSpinner /> : <Trash size={16} />}
      </Button>
    </div>
  );
};

export default TodosTableActions;
