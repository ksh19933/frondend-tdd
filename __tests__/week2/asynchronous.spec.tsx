import "@testing-library/jest-dom";
import { getDelayUserName, getUser } from "../../api/user.api";

//1. `getUser` 함수는 `fetch` API를 이용해 사용자 정보를 가져오는 비동기 함수입니다.
//    https://api.github.com/users/${username} 이 api를 이용
// 2. `getUser` 함수는 사용자 이름을 입력값으로 받아와 해당 사용자의 정보를 객체로 반환합니다.
// 3. `getDelayUserName` 함수는 사용자 정보를 주면 사용자 이름을 1분(60 * 1000 ms)의 딜레이 후에 반환합니다.

describe("비동기 테스트", () => {
  const username = "seunghwan12";

  it("`getUser` 함수는 사용자 이름을 입력값으로 받아와 해당 사용자의 정보를 객체로 반환하는 비동기 함수 입니다.", async () => {
    const user = await getUser(username);
    expect(user).toMatchObject({ login: username });
  });

  it("`getDelayUserName` 함수는 사용자 정보를 주면 사용자 이름을 1분(60 * 1000 ms)의 딜레이 후에 반환합니다.", async () => {
    jest.useFakeTimers();
    const user = await getUser(username);
    const promise = getDelayUserName(user);
    jest.advanceTimersByTime(60 * 1000);
    await expect(promise).resolves.toBe(username);
    jest.useRealTimers();
  });
});
