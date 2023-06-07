import "@testing-library/jest-dom";
import { getGithubUserNameApi } from "../../utils/api";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// - 새로운 파일 **`api.ts`**를 생성하세요. 이 파일에는 API 호출을 담당하는 함수들을 작성할 것입니다.
// - **`api.ts`** 파일에 *`**getGithubUserNameApi*()**`라는 함수를 작성하세요. 이 함수는 외부 API로 요청을 보내고 응답을 반환하는 비동기 함수입니다.
// - [https://api.github.com/users/${username}](https://api.github.com/users/$%7Busername%7D) 이용하기
// - Jest-Fetch-Mock을 사용하여 *`**getGithubUserNameApi*()**` 함수의 API 호출을 가로채고 모의 응답을 제공하는 테스트를 작성하세요.
// - **`fetchMock`** 객체를 사용하여 API 호출을 가로채고 모의 응답을 설정하세요.
// - `**name**`을 `**rthan**`이 되도록 `**mocking**` 하기
// - **`fetchDataFromAPI()`** 함수를 호출하여 응답을 받아오는지, 응답이 올바른 형식인지 등을 테스트하세요.
describe("api t est", () => {
  it("getGithubUserNameApi", async () => {
    const mockResponse = {
      name: "rthan",
    };
    const mock = new MockAdapter(axios);

    const param = "seunghwan12";
    mock
      .onGet(`https://api.github.com/users/${param}`)
      .reply(200, mockResponse);
    const name = await getGithubUserNameApi(param);

    expect(name).toEqual(mockResponse.name);
  });
});
