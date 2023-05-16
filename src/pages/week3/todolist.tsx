import { useState } from "react";

const TodoList = () => {
  const [todolist, setTodoList] = useState<string[]>([]);
  const [todo, setTodo] = useState("");
  return (
    <div>
      <input
        data-testid={`input_todo`}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        data-testid={`add_todo`}
        aria-label="add"
        onClick={() => {
          if (!todo) return;
          setTodo("");
          setTodoList([...todolist, todo]);
        }}
      >
        add
      </button>
      <div data-testid="todo_list">
        {todolist.length === 0
          ? "할 일이 없습니다."
          : todolist.map((todo, idx) => (
              <div key={todo + idx} data-testid={todo + idx}>
                <p>{todo}</p>
                <button
                  data-testid={`delete_todo${idx}`}
                  aria-label="delete"
                  onClick={() =>
                    setTodoList((prev) => prev.filter((el) => el != todo))
                  }
                >
                  delete
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};
export default TodoList;
