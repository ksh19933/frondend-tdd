import "@testing-library/jest-dom";
import {
  fireEvent,
  getByRole,
  render,
  RenderResult,
} from "@testing-library/react";
import Signup from "../../src/pages/week4/week4";
import * as api from "../../utils/api";
import clearAllMocks = jest.clearAllMocks;
jest.mock("../../utils/api");

// > 이번 과제에서는 getByTestId를 사용하지 않고 getByRole과 getByLabelText를 사용합니다.

describe("week4", () => {
  let renderedComponent: RenderResult;
  beforeEach(() => {
    renderedComponent = render(<Signup />);
  });
  it("should have placeholder", () => {
    const { getByPlaceholderText } = renderedComponent;
    expect(getByPlaceholderText("이름을 입력하세요")).toBeInTheDocument();
    expect(getByPlaceholderText("이메일을 입력하세요")).toBeInTheDocument();
  });
  it("이름 입력 필드에서 값이 올바르게 업데이트되는지 확인합니다.", () => {
    const { getByLabelText } = renderedComponent;
    const nameInput = getByLabelText("name-input");
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput).toHaveValue("test");
  });
  it("이메일 입력 필드에서 값이 올바르게 업데이트되는지 확인합니다.", () => {
    const { getByLabelText } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "" } });
    expect(emailInput).toHaveValue("");
  });
  it("이메일에 알맞은 값이 없을 경우 인증 버튼은 비활성화 상태입니다.", () => {
    const { getByLabelText, getByRole } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "" } });
    expect(
      getByRole("button", {
        name: "이메일 인증",
      })
    ).toBeDisabled();
  });
  it("가입 버튼은 비활성화 상태입니다.", () => {
    const { getByRole } = renderedComponent;
    expect(getByRole("button", { name: "가입" })).toBeDisabled();
  });
});
describe("이메일 인증 확인 기능을 테스트", () => {
  let renderedComponent: RenderResult;
  const mockEmailFunc = api.emailValidApi as jest.Mock;
  beforeEach(() => {
    renderedComponent = render(<Signup />);
  });
  afterEach(() => {
    clearAllMocks();
  });
  // 이메일 형식은 id 부분에는 영문자, 숫자, 특수문자(._%+-)가 허용되며,
  // 그 다음은 기호가 이어지고 이어서는 도메인 주소가 나타납니다.
  // 마지막으로,도메인 주소는 마침표(.)와 문자2개 이상으로 끝납니다.
  it("이메일 입력 필드에 형식에 맞는 값을 입력하면 인증 확인 버튼이 활성화됩니다.", () => {
    const { getByLabelText, getByRole } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "rtan@teamsparta.co" } });
    const button = getByRole("button", {
      name: "이메일 인증",
    });
    expect(button).toBeEnabled();
  });
  it("버튼을 누르고 성공했을 경우 '인증 완료' 메시지가 표시됩니다.", async () => {
    mockEmailFunc.mockReturnValue("인증 완료");
    const { getByLabelText, getByRole, getByText } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "rtan@teamsparta.co" } });
    const button = getByRole("button", {
      name: "이메일 인증",
    });
    fireEvent.click(button);
    expect(getByText("인증 완료")).toBeInTheDocument();
  });
  it("버튼을 누르고 실패했을 경우 '중복된 이메일입니다.' 메시지가 표시됩니다.", async () => {
    mockEmailFunc.mockReturnValue("중복된 이메일입니다.");
    const { getByLabelText, getByRole, getByText } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "rtan@teamsparta.co" } });
    const button = getByRole("button", {
      name: "이메일 인증",
    });
    fireEvent.click(button);
    expect(getByText("중복된 이메일입니다.")).toBeInTheDocument();
  });
  it("인증이 완료된 후에 이메일은 변경할 수 없습니다.", async () => {
    mockEmailFunc.mockReturnValue("인증 완료");
    const { getByLabelText, getByRole, getByText } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "rtan@teamsparta.co" } });
    const button = getByRole("button", {
      name: "이메일 인증",
    });
    fireEvent.click(button);
    expect(getByText("인증 완료")).toBeInTheDocument();
    expect(emailInput).toBeDisabled();
  });
});
describe("가입 버튼 기능 테스트", () => {
  let renderedComponent: RenderResult;
  const mockEmailFunc = api.emailValidApi as jest.Mock;
  const mockSignupFunc = api.signupApi as jest.Mock;
  beforeEach(() => {
    renderedComponent = render(<Signup />);
    mockEmailFunc.mockReturnValue("인증 완료");
    const { getByLabelText, getByRole } = renderedComponent;
    const emailInput = getByLabelText("email-input");
    const nameInput = getByLabelText("name-input");
    fireEvent.change(emailInput, { target: { value: "rtan@teamsparta.co" } });
    fireEvent.change(nameInput, { target: { value: "이름" } });
    const emailButton = getByRole("button", {
      name: "이메일 인증",
    });
    fireEvent.click(emailButton);
  });
  afterEach(() => {
    clearAllMocks();
  });
  it("이름이 최소 2글자 이상 입력된 경우, 이메일 인증이 완료된 경우 가입 버튼은 활성화됩니다.", async () => {
    const { getByRole } = renderedComponent;
    const button = getByRole("button", {
      name: "가입",
    });
    expect(button).toBeEnabled();
  });
  it("가입에 성공했을 경우 '가입에 성공했습니다.'라는 메시지를 반환합니다.", async () => {
    mockSignupFunc.mockReturnValue("가입에 성공했습니다.");
    const { getByRole } = renderedComponent;
    const button = getByRole("button", {
      name: "가입",
    });
    fireEvent.click(button);
    expect(getByRole("alert")).toHaveTextContent("가입에 성공했습니다.");
  });

  it("가입에 실패했을 경우 '가입에 실패했습니다.'라는 메시지를 반환합니다.", async () => {
    mockSignupFunc.mockReturnValue("가입에 실패했습니다.");
    const { getByRole } = renderedComponent;
    const button = getByRole("button", {
      name: "가입",
    });
    fireEvent.click(button);
    expect(getByRole("alert")).toHaveTextContent("가입에 실패했습니다.");
  });
});
