import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/store";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find((c) => c.id === parseInt(id));

      if (contact) {
        setFormData({
          full_name: contact.full_name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
        });
      }
    }
  }, [id, store.contacts]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };


    if (id) {
      await actions.updateContact(id, contactData);
    } else {
      await actions.addContact(contactData);
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h1 className="text-center mb-4">
            {id ? "Edit contact" : "Add a new contact"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              save
            </button>
          </form>

          <Link to="/">
            <p className="text-primary text-left mt-3" style={{ textDecoration: 'underline' }}>
              or get back to contacts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
