"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoFormValues, todoFormSchema } from "@/schema";
import { createTodoAction, updateTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Todo } from "@/interfaces";

const TodoForm = ({
  todo,
  userId,
}: {
  todo?: Todo;
  userId?: string | null;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues: Partial<todoFormValues> = {
    title: todo?.title || "",
    body: todo?.body || "",
    compeleted: todo?.compeleted || false,
  };

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: todoFormValues) => {
    setLoading(true);
    if (todo) {
      await updateTodoAction(todo.id, data);
    } else if (userId) {
      await createTodoAction({ data, userId });
    }
    setLoading(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {todo ? (
          <Button size={"icon"}>
            <Pen size={16} />
          </Button>
        ) : (
          <Button variant="secondary" size={"lg"}>
            <Plus size={16} className="mr-1" /> New Todo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo ? "Edit Todo" : "Add New Todo"}</DialogTitle>
          <DialogDescription>
            {todo ? "Make changes in your todo" : "Add new todo in your list"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="NextJS course"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compeleted"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                        ref={field.ref}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormLabel>Compeleted</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner textColor="black" />
                      <p>Saving</p>
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
