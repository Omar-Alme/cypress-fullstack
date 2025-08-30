import { defineConfig } from "cypress";
import { db } from "./prisma/db";
import { seedTodos } from "./prisma/seed/todo";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async reseed() {
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
