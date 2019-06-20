import { K_API_BY_NAME } from "utils/constants";

export default function getApiByName(name, count, page, token) {
  const url = new URL(K_API_BY_NAME);
  const params = { name: name, count: count, page: page };

  url.search = new URLSearchParams(params);
  return fetch(url, {
    headers: {
      "Auth-Token": token
    }
  }).then(response => response.json());
}
