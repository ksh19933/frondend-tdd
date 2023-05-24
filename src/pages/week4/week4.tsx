import { ChangeEvent, useState } from "react";
import { emailValidApi, signupApi } from "../../../utils/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [msg, setMsg] = useState("");
  const [isEmailDone, setIsEmailDone] = useState(false);

  const checkEmailValidate = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsNameValid(value.length >= 2);
    setName(value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = checkEmailValidate(value);
    setIsEmailValid(isValid);
    setEmail(e.target.value);
  };
  const onClickValidateRequestHandler = () => {
    const data = emailValidApi();
    setMsg(data);
    if (data === "인증 완료") setIsEmailDone(true);
  };
  const onClickSignupHandler = () => {
    const data = signupApi();
    setMsg(data);
  };
  return (
    <div>
      <input
        aria-label={"name-input"}
        value={name}
        placeholder="이름을 입력하세요"
        onChange={onChangeName}
      />
      <input
        aria-label={"email-input"}
        value={email}
        placeholder="이메일을 입력하세요"
        onChange={onChangeEmail}
        disabled={isEmailDone}
      />
      <button
        aria-describedby={"email-confirmation"}
        onClick={onClickValidateRequestHandler}
        disabled={!isEmailValid}
      >
        이메일 인증
      </button>
      <button
        aria-describedby={"signup"}
        disabled={!isNameValid || !isEmailDone}
        onClick={onClickSignupHandler}
      >
        가입
      </button>
      <p role="alert">{msg}</p>
    </div>
  );
};
export default Signup;
