export const getAccessToken = () => localStorage.getItem("accessToken");
export const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

export const getBackend = () => process.env.REACT_APP_BACKEND;

export const unPost = (endpoint: string, body: Object) => {
  return fetch(`${getBackend()}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const post = (endpoint: string, body: Object) => {
  return fetch(`${getBackend()}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const get = (endpoint: string) => {
  return fetch(`${getBackend()}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
