// lightweight "mock API" that persists to localStorage
// Provides async functions to simulate network latency

const LS_KEY = "cleaning_admin_data_v1";

function readStore() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    const seed = {
      users: [
        { id: "u1", name: "John Doe", email: "john@example.com", phone: "+1 555 000", role: "user", active: true },
        { id: "u2", name: "Jane Admin", email: "admin@cleaning.com", phone: "+1 555 111", role: "admin", active: true },
      ],
      companies: [
        { id: "c1", name: "Sparkle Clean", email: "hello@sparkle.com", rating: 4.6, verified: true, active: true, services: ["s1"] },
        { id: "c2", name: "Shine & Co", email: "contact@shine.com", rating: 4.2, verified: false, active: true, services: [] },
      ],
      services: [
        { id: "s1", name: "Home Cleaning", description: "Standard home cleaning", pricePerHour: 25, category: "home" },
        { id: "s2", name: "Carpet Cleaning", description: "Deep carpet treatment", pricePerHour: 40, category: "specialty" },
      ],
      bookings: [
        { id: "b1", userId: "u1", companyId: "c1", serviceId: "s1", scheduledAt: new Date().toISOString(), status: "confirmed", price: 80 },
      ],
    };
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function writeStore(store) {
  localStorage.setItem(LS_KEY, JSON.stringify(store));
}

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function listUsers() {
  await delay();
  const s = readStore();
  return s.users;
}
export async function listCompanies() {
  await delay();
  return readStore().companies;
}
export async function getCompany(id) {
  await delay();
  return readStore().companies.find((c) => c.id === id) || null;
}
export async function createCompany(payload) {
  await delay();
  const s = readStore();
  const item = { id: uid("c"), ...payload };
  s.companies.push(item);
  writeStore(s);
  return item;
}
export async function updateCompany(id, payload) {
  await delay();
  const s = readStore();
  s.companies = s.companies.map((c) => (c.id === id ? { ...c, ...payload } : c));
  writeStore(s);
  return s.companies.find((c) => c.id === id);
}
export async function deleteCompany(id) {
  await delay();
  const s = readStore();
  s.companies = s.companies.filter((c) => c.id !== id);
  // also remove company from bookings (naive)
  s.bookings = s.bookings.filter((b) => b.companyId !== id);
  writeStore(s);
  return true;
}

export async function listServices() {
  await delay();
  return readStore().services;
}
export async function getService(id) {
  await delay();
  return readStore().services.find((s) => s.id === id) || null;
}
export async function createService(payload) {
  await delay();
  const s = readStore();
  const item = { id: uid("s"), ...payload };
  s.services.push(item);
  writeStore(s);
  return item;
}
export async function updateService(id, payload) {
  await delay();
  const s = readStore();
  s.services = s.services.map((c) => (c.id === id ? { ...c, ...payload } : c));
  writeStore(s);
  return s.services.find((c) => c.id === id);
}
export async function deleteService(id) {
  await delay();
  const s = readStore();
  s.services = s.services.filter((c) => c.id !== id);
  // remove reference from companies
  s.companies = s.companies.map((c) => ({ ...c, services: (c.services || []).filter((sid) => sid !== id) }));
  writeStore(s);
  return true;
}

export async function listBookings() {
  await delay();
  return readStore().bookings;
}
export async function updateBooking(id, payload) {
  await delay();
  const s = readStore();
  s.bookings = s.bookings.map((b) => (b.id === id ? { ...b, ...payload } : b));
  writeStore(s);
  return s.bookings.find((b) => b.id === id);
}
