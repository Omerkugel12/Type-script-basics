import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface CreateFormProps {
  handleCreateTodo: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function CreateTodoForm({ handleCreateTodo }: CreateFormProps) {
  return (
    <form
      onSubmit={(ev) => handleCreateTodo(ev)}
      className="flex flex-col gap-2 w-60 p-2 border border-black rounded-xl"
    >
      <Input name="title" placeholder="Enter new todo" />
      <Button>Add todo</Button>
    </form>
  );
}

export default CreateTodoForm;
