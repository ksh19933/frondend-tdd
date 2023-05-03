import axios from "axios";

export const getUser = async (username: string): Promise<any> => {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url);
  return response.data;
};

export function getDelayUserName(user: any): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.name);
    }, 60 * 1000);
  });
}
