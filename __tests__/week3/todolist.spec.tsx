import "@testing-library/jest-dom";
import {
  fireEvent,
  getByRole,
  render,
  RenderResult,
} from "@testing-library/react";
import TodoList from "../../src/pages/week3/todolist";

describe("todo list test", () => {
  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(<TodoList />);
  });

  it('컴포넌트는 todoList가 비어 있을 때는 "할 일이 없습니다."라는 메시지를 보여주어야 합니다.', () => {
    const { getByText } = renderedComponent;
    expect(getByText("할 일이 없습니다.")).toBeInTheDocument();
  });

  it("input 필드에는 새로운 할 일을 입력할 수 있습니다.", () => {
    const { getByRole } = renderedComponent;
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "Clean the house" } });
    expect(input).toHaveValue("Clean the house");
  });
  it("add 버튼을 누르면 input 필드에 입력한 내용이 todoList에 추가되어야 합니다.", () => {
    const { getByRole, getByLabelText, getByText } = renderedComponent;
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "Clean the house" } });
    const addBtn = getByLabelText("add");
    fireEvent.click(addBtn);
    expect(getByText("Clean the house")).toBeInTheDocument();
  });

  it("각각의 할 일은 삭제 버튼이 있어야 하며, 삭제 버튼을 누르면 해당 할 일이 todoList에서 제거되어야 합니다.", () => {
    const { getByTestId, queryByText } = renderedComponent;
    const input = getByTestId("input_todo");
    fireEvent.change(input, { target: { value: "Clean the house" } });
    const addBtn = getByTestId("add_todo");
    fireEvent.click(addBtn);
    const deleteBtn = getByTestId("delete_todo0");
    fireEvent.click(deleteBtn);
    expect(queryByText("Clean the house")).not.toBeInTheDocument();
  });
});

describe("matcher study test", () => {
  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(<TodoList />);
  });
  // 1. toHaveLength Matcher를 사용하는 테스트 코드 작성:
  it("todoList에 n개의 할 일이 추가되었을 때, toHaveLength Matcher를 사용하여 todoList의 길이가 n인지 확인하는 테스트 코드 작성.", () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    const todoList = ["Clean the house", "Buy groceries", "Go to the gym"];
    todoList.forEach((todo) => {
      fireEvent.change(input, { target: { value: todo } });
      fireEvent.click(addBtn);
    });
    expect(getByTestId("todo_list").children).toHaveLength(todoList.length);
  });
  // 2. toContain Matcher를 사용하는 테스트 코드 작성:
  it('todoList에 "Buy groceries"라는 할 일이 추가되었을 때, toContain Matcher를 사용하여 todoList에 "Buy groceries"가 포함되어 있는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    fireEvent.change(input, { target: { value: "Buy groceries" } });
    fireEvent.click(addBtn);
    expect(getByTestId("Buy groceries0").innerHTML).toContain("Buy groceries");
  });
  // 3. toMatch Matcher를 사용하는 테스트 코드 작성:
  it('todoList에 "Study for exam"이라는 할 일이 추가되었을 때, toMatch Matcher를 사용하여 todoList에서 "Study"라는 단어를 포함하는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    fireEvent.change(input, { target: { value: "Study for exam" } });
    const addBtn = getByTestId("add_todo");
    fireEvent.click(addBtn);
    expect(getByTestId("todo_list").textContent).toMatch(/Study/);
  });
  // 4. not.toMatch Matcher를 사용하는 테스트 코드 작성:
  it('todoList에 "Clean the house"라는 할 일이 추가되었을 때, not.toMatch Matcher를 사용하여 todoList에서 "Work"라는 단어를 포함하지 않는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    fireEvent.change(input, { target: { value: "Clean the house" } });
    const addBtn = getByTestId("add_todo");
    fireEvent.click(addBtn);
    expect(getByTestId("todo_list").textContent).not.toMatch(/Work/);
  });
  // 5. toBe Matcher를 사용하는 테스트 코드 작성:
  it('todoList에 "Write code"라는 할 일이 추가되었을 때, toBe Matcher를 사용하여 todoList에 추가된 문장이 일치하는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    fireEvent.change(input, { target: { value: "Write code" } });
    fireEvent.click(addBtn);
    expect(getByTestId("Write code0").firstChild?.textContent).toBe(
      "Write code"
    );
  });
  // 6. toBeNull Matcher를 사용하여 특정 할 일이 삭제되면 해당 위치의 값이 null인지 확인하는 테스트 코드 작성.
  it('todoList에 "Write code"라는 할 일이 추가되었을 때, toBeNull Matcher를 사용하여 todoList에 추가된 문장이 일치하는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId, queryByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    fireEvent.change(input, { target: { value: "Write code" } });
    fireEvent.click(addBtn);
    const deleteBtn = getByTestId("delete_todo0");
    fireEvent.click(deleteBtn);
    expect(queryByTestId("Write code0")).toBeNull();
  });
  // 7. toBeTruthy Matcher를 사용하여 특정 할 일이 추가되면 해당 위치의 값이 truthy한 값인지 확인하는 테스트 코드 작성.
  it('todoList에 "Write code"라는 할 일이 추가되었을 때, toBeTruthy Matcher를 사용하여 todoList에 문장이 추가되었는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    fireEvent.change(input, { target: { value: "Write code" } });
    fireEvent.click(addBtn);
    expect(getByTestId("Write code0").firstChild).toBeTruthy();
  });
  // 8. toThrow Matcher를 사용하여 잘못된 인덱스를 입력할 경우 delete 함수가 예외를 throw하는지 확인하는 테스트 코드 작성.
  it('todoList에 "Write code"라는 할 일이 추가되었을 때, toThrow Matcher를 사용하여 잘못된 인덱스를 입력할 경우 delete 함수가 예외를 throw하는지 확인하는 테스트 코드 작성.', () => {
    const { getByTestId } = renderedComponent;
    const input = getByTestId("input_todo");
    const addBtn = getByTestId("add_todo");
    fireEvent.change(input, { target: { value: "Write code" } });
    fireEvent.click(addBtn);
    expect(() => {
      getByTestId("delete_todo1");
    }).toThrow();
  });
});
