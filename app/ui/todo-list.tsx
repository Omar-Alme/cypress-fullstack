"use client";

import { Entry } from "@/generated/prisma";
import { useState } from "react";

interface Props {
  defaultTodos: Entry[];
}

export default function TodoList({ defaultTodos }: Props) {
  const [entries, setEntries] = useState(defaultTodos);

  return (
    <ul>
      {entries.map((t) => (
        <li key={t.id}>
          <span>{t.text}</span>
          <button
            onClick={() => setEntries(entries.filter(({ id }) => t.id !== id))}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
