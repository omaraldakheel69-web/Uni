const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async getCompanies() {
    const res = await fetch(`${API_URL}/companies`);
    if (!res.ok) throw new Error("Failed to fetch companies");
    return res.json();
  },

  async getServices() {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  }
};
