import { K_API_BYID } from "utils/constants";

export default function getApiByname(query, count, page, token) {
  const url = new URL(K_API_BYID);
  const params = { query, count: count, page: page };

  url.search = new URLSearchParams(params);
  return fetch(url, {
    headers: {
      "Auth-Token": token
    }
  }).then(response => response.json());
}
