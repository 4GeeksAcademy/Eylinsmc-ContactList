import { useReducer, useEffect } from "react";

const unique_url = "esmc_contact_list"; 
const baseUrl = `https://playground.4geeks.com/contact/agendas/${unique_url}/contacts`;

const initialState = {
  contacts: [],
};

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

  const getContacts = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };


  const addContact = async (contact) => {
    const contactList = { ...contact, unique_url: unique_url };
    
    try {
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactList),
      });
      getContacts(); 
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      getContacts();
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };


  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/contacts/${id}`, {
        method: "DELETE",
      });
      getContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    store,
    actions: { getContacts, addContact, updateContact, deleteContact },
  };
};



