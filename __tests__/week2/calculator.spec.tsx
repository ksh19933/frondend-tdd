import "@testing-library/jest-dom";
import {
  RenderResult,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import Calculator from "../../src/pages/week2/calculator";

/**
 * 1. 컴포넌트는 `num1`, `num2`, `add`, `subtract`, `multiply`, `divide` 6개의 인풋 필드와 버튼을 가지고 있습니다.
 * 2. `num1`과 `num2` 인풋 필드에는 숫자를 입력할 수 있습니다.
 * 3. `add`, `subtract`, `multiply`, `divide` 버튼을 누르면 `num1`과 `num2` 값을 이용해 더하기, 빼기, 곱하기, 나누기 연산이 수행되어야 합니다. 연산 결과는 `result`라는 상태값에 저장되어야 합니다.
 * 4. `divide` 연산은 소수점 2번째 자리까지만 표시되어야 합니다.
 */

describe("week1 test", () => {
  let renderedComponent: RenderResult;
  let numInput1: HTMLElement;
  let numInput2: HTMLElement;
  beforeEach(() => {
    renderedComponent = render(<Calculator />);
    numInput1 = screen.getByTestId("num1");
    numInput2 = screen.getByTestId("num2");
    fireEvent.change(numInput1, { target: { value: "4" } });
    fireEvent.change(numInput2, { target: { value: "3" } });
  });

  it("컴포넌트는 `num1`, `num2`, `add`, `subtract`, `multiply`, `divide` 6개의 인풋 필드와 버튼을 가지고 있습니다.", () => {
    expect(screen.getByTestId("num1")).toBeInTheDocument();
    expect(screen.getByTestId("num2")).toBeInTheDocument();
    expect(screen.getByTestId("add")).toBeInTheDocument();
    expect(screen.getByTestId("subtract")).toBeInTheDocument();
    expect(screen.getByTestId("multiply")).toBeInTheDocument();
    expect(screen.getByTestId("divide")).toBeInTheDocument();
  });
  it("`num1`과 `num2` 인풋 필드에는 숫자를 입력할 수 있습니다.", () => {
    fireEvent.change(numInput1, { target: { value: "10" } });
    fireEvent.change(numInput2, { target: { value: "20" } });
    expect(numInput1).toHaveValue(10);
    expect(numInput2).toHaveValue(20);
  });

  it("`add` button을 누르면 더하기 연산이 수행된다. 결과값은 number에 저장된다.", () => {
    const addBtn = screen.getByTestId("add");
    fireEvent.click(addBtn);
    expect(screen.getByText(7)).toBeInTheDocument();
  });
  it("`subtract` button을 누르면 빼기 연산이 수행된다. 결과값은 number에 저장된다.", () => {
    const subtractBtn = screen.getByTestId("subtract");
    fireEvent.click(subtractBtn);
    expect(screen.getByText(1)).toBeInTheDocument();
  });
  it("`multiply` button을 누르면 곱하기 연산이 수행된다. 결과값은 number에 저장된다.", () => {
    const multiplyBtn = screen.getByTestId("multiply");
    fireEvent.click(multiplyBtn);
    expect(screen.getByText(12)).toBeInTheDocument();
  });
  it("`divide` button을 누르면 나누기 연산이 수행된다. 결과값은 number에 저장된다.", () => {
    const divideBtn = screen.getByTestId("divide");
    fireEvent.click(divideBtn);
    expect(screen.getByText(1.33)).toBeInTheDocument();
  });
});
