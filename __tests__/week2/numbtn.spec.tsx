import "@testing-library/jest-dom";
import {
  RenderResult,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import NumBtn from "../../src/pages/week2/numbtn";
/**
 * 1. 컴포넌트는 `number`라는 상태값을 가지고 있습니다. 이 값은 `0`으로 초기화되어야 합니다.
 * 2. 컴포넌트는 `increment`와 `decrement` 두 개의 버튼을 가지고 있습니다. `increment` 버튼을 누르면 `number` 값이 1 증가하고, `decrement` 버튼을 누르면 `number` 값이 1 감소합니다.
 * 3. `number` 값은 음수가 되지 않도록 제한되어야 합니다.
 * */
describe("number 증가/감소 btn 테스트", () => {
  let renderedComponent: RenderResult;
  beforeEach(() => {
    renderedComponent = render(<NumBtn />);
  });

  it("컴포넌트는 `number`라는 상태값을 가지고 있습니다. 이 값은 `0`으로 초기화되어야 합니다.", () => {
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  it("`increment` 버튼을 누르면 `number` 값이 1 증가합니다.", () => {
    const incrementButton = screen.getByTestId("increment");
    fireEvent.click(incrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
  it("`decrement` 버튼을 누르면 `number` 값이 1 감소합니다.", () => {
    const incrementButton = screen.getByTestId("increment");
    const decrementButton = screen.getByTestId("decrement");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  it("`number` 값은 음수가 되지 않도록 제한되어야 합니다.", () => {
    const incrementButton = screen.getByTestId("increment");
    const decrementButton = screen.getByTestId("decrement");
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText("0")).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
