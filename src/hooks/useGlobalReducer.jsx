import { useReducer, useEffect } from "react";

const agendaSlug = "esmc_contact_list";
const API_BASE = "https://playground.4geeks.com/contact";

const initialState = { contacts: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

export const useGlobalReducer = () => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const ensureAgendaExists = async () => {
    try {
      const res = await fetch(`${API_BASE}/agendas/${agendaSlug}`);
      if (res.status === 404) {
        const create = await fetch(`${API_BASE}/agendas/${agendaSlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", accept: "application/json" },
          body: JSON.stringify({ name: agendaSlug, description: "My agenda" }),
        });
        if (!create.ok) {
          const j = await create.json().catch(() => null);
          throw new Error(j?.detail || `Agenda create failed (HTTP ${create.status})`);
        }
      }
    } catch (err) {
      console.error("ensureAgendaExists:", err);
    }
  };

  const getContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/agendas/${agendaSlug}/contacts`, {
        headers: { accept: "application/json" },
      });
      const data = await res.json().catch(() => ([]));
      const list = Array.isArray(data) ? data : (data?.contacts ?? []);
      dispatch({ type: "SET_CONTACTS", payload: list });
    } catch (err) {
      console.error("getContacts:", err);
      dispatch({ type: "SET_CONTACTS", payload: [] });
    }
  };

  const addContact = async (contact) => {
    const payload = {
      name: (contact.name ?? "").trim(),
      email: (contact.email ?? "").trim(),
      phone: (contact.phone ?? "").trim(),
      address: (contact.address ?? "").trim(),
    };
    if (!payload.name || !payload.email) {
      throw new Error("Name and Email are required.");
    }
    const res = await fetch(`${API_BASE}/agendas/${agendaSlug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      throw new Error(j?.detail || `Create failed (HTTP ${res.status})`);
    }
    await getContacts();
  };

  const updateContact = async (id, contact) => {
    const payload = {
      name: (contact.name ?? "").trim(),
      email: (contact.email ?? "").trim(),
      phone: (contact.phone ?? "").trim(),
      address: (contact.address ?? "").trim(),
    };
    if (!payload.name || !payload.email) {
      throw new Error("Name and Email are required.");
    }
    const res = await fetch(`${API_BASE}/agendas/${agendaSlug}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      throw new Error(j?.detail || `Update failed (HTTP ${res.status})`);
    }
    await getContacts();
  };

  const deleteContact = async (id) => {
    const res = await fetch(`${API_BASE}/agendas/${agendaSlug}/contacts/${id}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      throw new Error(j?.detail || `Delete failed (HTTP ${res.status})`);
    }
    await getContacts();
  };

  useEffect(() => {
    ensureAgendaExists().then(getContacts);
  }, []);

  return {
    store,
    actions: { getContacts, addContact, updateContact, deleteContact },
  };
};
