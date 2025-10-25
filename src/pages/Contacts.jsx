import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/store";
import ContactCard from "../components/ContactCard";

const Contacts = () => {
  const { store } = useContext(Context);

  return (
    <>
      <div className="d-flex justify-content-end mb-4">
        <Link className="btn btn-success" to="/add-contact">
          Add new contact
        </Link>
      </div>

      <div className="row">
        {store.contacts.length === 0 ? (
          <h4 className="text-center">No contacts yet. Add one!</h4>
        ) : (
          store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </>
  );
};

export default Contacts;