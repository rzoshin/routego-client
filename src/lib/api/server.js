import {baseURL} from "./baseUrl";

export const serverMutation = async (data, path, method) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export const deleteMutation = async (path) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const serverFetch = async (path) => {
    const res = await fetch(`${baseURL}/${path}`);
    return res.json();
}