import axios from "axios";
import { useEffect, useState } from "react";
import { Todo, TODOS_URL } from "./TodosPage";
import { useParams } from "react-router";

function TodoDetails() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const { todoId } = useParams();

  useEffect(() => {
    async function fetchTodo() {
      try {
        const { data: fetchedTodo } = await axios.get(`${TODOS_URL}/${todoId}`);
        setTodo(fetchedTodo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodo();
  }, []);

  if (!todo) return;

  return (
    <>
      <h1>{todo && todo.title}</h1>
      {todo.isComplete ? (
        <p className="text-green-600">Completed</p>
      ) : (
        <p className="text-red-600">Active</p>
      )}
    </>
  );
}

export default TodoDetails;
