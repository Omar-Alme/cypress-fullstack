import { db } from "@/prisma/db";
import TodoList from "./ui/todo-list";

export default async function Home() {
  const entries = await db.entry.findMany();

  return (
    <main>
      <TodoList defaultTodos={entries} />
    </main>
  );
}
