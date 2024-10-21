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
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { todoFormValues, todoFormSchema } from "@/schema";
import { createTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "@/components/ui/checkbox";

const AddTodoForm = () => {
  const defaultValues: Partial<todoFormValues> = {
    title: "",
    body: "",
    compeleted: false,
  };

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: todoFormValues) => {
    console.log(data);
    await createTodoAction(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"lg"}>
          <Plus size={16} className="mr-1" /> New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>Make changes in your todo</DialogDescription>
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
                      />
                    </FormControl>
                    <FormLabel>Compeleted</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
