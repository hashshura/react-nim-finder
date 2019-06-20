import { K_API_BYNAME } from "utils/constants";

export default function getApiByname(name, count, page, token) {
  const url = new URL(K_API_BYNAME);
  const params = { name: name, count: count, page: page };

  url.search = new URLSearchParams(params);
  return fetch(url, {
    headers: {
      "Auth-Token": token
    }
  }).then(response => response.json());
}
