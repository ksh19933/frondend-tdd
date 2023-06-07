import axios from "axios";

export function emailValidApi() {
  return "pending";
}
export function signupApi() {
  return "pending";
}

export async function getGithubUserNameApi(username: string) {
  const url = "https://api.github.com/users/";
  const rsp = await axios.get(url + username);
  return rsp.data.name;
}
