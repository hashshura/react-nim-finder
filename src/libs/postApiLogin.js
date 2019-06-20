import { K_API_LOGIN } from "utils/constants";

export default function postApiLogin(username, password) {
  const details = {
    username: username,
    password: password
  };

  return fetch(K_API_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: Object.keys(details)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&")
  })
    .then(response => response.json());
}
