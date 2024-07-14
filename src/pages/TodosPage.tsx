import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const TODOS_URL = "http://localhost:8001/todos";

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

export type TodoWithoutId = Omit<Todo, "id">;

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const { data: fetchedTodos } = await axios.get(TODOS_URL);
        setTodos(fetchedTodos);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodos();
  }, []);

  async function handleCreatePost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const formData = new FormData(ev.currentTarget);
    const title = formData.get("title") as string;
    const newTodo: TodoWithoutId = { title: title, isComplete: false };
    try {
      const res = await axios.post(TODOS_URL, newTodo);
      setTodos((prevTodos) => [...prevTodos, res.data]);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleTodo(todoId: string) {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === todoId);
      if (!todoToUpdate) return;

      const updatedTodo = {
        ...todoToUpdate,
        isComplete: !todoToUpdate.isComplete,
      };
      await axios.put(`${TODOS_URL}/${todoId}`, updatedTodo);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? { ...todo, isComplete: updatedTodo.isComplete }
            : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>todos</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <label>{todo.title}</label>
              </div>
            </li>
          );
        })}
      </ul>
      <form
        onSubmit={(ev) => handleCreatePost(ev)}
        className="flex flex-col gap-2 w-60 p-2 border border-black rounded-xl"
      >
        <Input name="title" placeholder="Enter new todo" />
        <Button>Add todo</Button>
      </form>
    </div>
  );
}

export default TodosPage;
