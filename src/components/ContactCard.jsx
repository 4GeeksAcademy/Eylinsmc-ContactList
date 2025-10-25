import React, { useContext, useState } from "react";
import { Context } from "../store/store";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);

  const handleDeleteConfirm = () => {
    actions.deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <div className="col-12 mb-3">
      <div className="card border-0 shadow-sm">
        <div className="card-body d-flex align-items-center p-3">
          <div className="me-3">
            <img
              src="https://via.placeholder.com/150/0000FF/808080?text=MA"
              alt={contact.full_name}
              className="rounded-circle border border-secondary"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>

          <div className="flex-grow-1">
            <h5 className="card-title fw-bold mb-1">{contact.full_name}</h5>
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

          <div className="d-flex flex-column align-self-start">
            <i
              className="fa-solid fa-pencil text-secondary cursor-pointer mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/edit-contact/${contact.id}`)}
            ></i>
            <i
              className="fa-solid fa-trash-can text-danger cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteClick}
            ></i>
          </div>
        </div>
      </div>
      <ModalConfirm
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        contactName={contact.full_name}
      />
    </div>
  );
};

export default ContactCard;
