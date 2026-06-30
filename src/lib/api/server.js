import { baseURL } from "./baseUrl";
import { getAuthHeaders } from "./authHeaders";

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const serverMutation = async (data, path, method) => {
  try {
    const res = await fetch(`${baseURL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(res);
  } catch {
    return null;
  }
};

export const deleteMutation = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`, { method: "DELETE" });
    return parseResponse(res);
  } catch {
    return null;
  }
};

export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const data = await parseResponse(res);
    if (!res.ok) return null;
    return data;
  } catch {
    return null;
  }
};

export const authenticatedMutation = async (data, path, method) => {
  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseURL}${path}`, {
      method,
      headers: authHeaders,
      body: JSON.stringify(data),
    });
    return parseResponse(res);
  } catch {
    return null;
  }
};

export const authenticatedDelete = async (path) => {
  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseURL}${path}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    return parseResponse(res);
  } catch {
    return null;
  }
};

export const authenticatedFetch = async (path) => {
  try {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      next: { revalidate: 0 },
      headers: authHeaders,
    });
    const data = await parseResponse(res);
    if (!res.ok) return null;
    return data;
  } catch {
    return null;
  }
};
