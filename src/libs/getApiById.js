import { K_API_BY_ID } from "utils/constants";

export default function getApiById(query, count, page, token) {
  const url = new URL(K_API_BY_ID);
  const params = { query, count: count, page: page };

  url.search = new URLSearchParams(params);
  return fetch(url, {
    headers: {
      "Auth-Token": token
    }
  }).then(response => response.json());
}
