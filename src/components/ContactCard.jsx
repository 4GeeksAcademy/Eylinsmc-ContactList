import React, { useContext, useState } from "react";
import { Context } from "../store/store";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);
  const handleDeleteConfirm = async () => {
    await actions.deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <div className="col-12 mb-3">
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex align-items-center p-3">
          <div className="me-3">
            <img
              src="https://via.placeholder.com/150/0000FF/808080?text=MA"
              alt={contact.name}
              className="rounded-circle border border-secondary contact-avatar"
            />
          </div>

          <div className="flex-grow-1">
            <h5 className="card-title fw-bold mb-1">{contact.name}</h5>
            <p className="card-text mb-0 text-muted">
              <i className="fa-solid fa-location-dot me-2"></i>
              {contact.address}
            </p>
            <p className="card-text mb-0 text-muted">
              <i className="fa-solid fa-phone me-2"></i>
              {contact.phone}
            </p>
            <p className="card-text mb-0 text-muted">
              <i className="fa-solid fa-envelope me-2"></i>
              {contact.email}
            </p>
          </div>

          <div className="d-flex align-items-start gap-3">
            <i
              className="fa-solid fa-pencil text-secondary cursor-pointer"
              role="button"
              title="Edit contact"
              onClick={() => navigate(`/edit-contact/${contact.id}`)}
            />
            <i
              className="fa-solid fa-trash-can text-danger cursor-pointer"
              role="button"
              title="Delete contact"
              onClick={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <ModalConfirm
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        contactName={contact.name}
      />
    </div>
  );
};

export default ContactCard;


