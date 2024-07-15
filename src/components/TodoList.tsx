import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Todo } from "../pages/TodosPage";

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (todoId: string) => Promise<void>;
  handleDeleteTodo: (todoId: string) => Promise<void>;
}

function TodoList({
  todos,
  handleToggleTodo,
  handleDeleteTodo,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 w-60 border border-black rounded-xl"
          >
            <div className="flex gap-1">
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <label>
                <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
              </label>
            </div>
            <Button onClick={() => handleDeleteTodo(todo.id)} variant="ghost">
              <Trash2 className="text-rose-800" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
