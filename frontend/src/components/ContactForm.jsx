import React, { useEffect, useState } from "react";
import contactService from "../services/contactService";
import toast from "react-hot-toast";

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

export default function ContactForm({ onSaved, editingContact, onCancelEdit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingContact) setForm(editingContact);
    else setForm({ name: "", email: "", phone: "" });
  }, [editingContact]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.name || !form.name.trim() || form.name.length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }
    if (form.email && !emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address."); 
      return false;
    }
    if (form.phone && !phoneRegex.test(form.phone)) {
      toast.error("Please enter a 10-digit phone number.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      if (editingContact?._id) {
        await contactService.updateContact(editingContact._id, form);
        toast.success("Contact updated");
      } else {
        await contactService.addContact(form);
        toast.success("Contact added");
      }
      setForm({ name: "", email: "", phone: "" });
      onSaved();
    } catch (err) {
      toast.error("Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">
        {editingContact ? "Edit Contact" : "Add Contact"}
      </h3>
      <form onSubmit={onSubmit} className="form">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Full name"
          required
          className="input"
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="input"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone"
          className="input"
        />
        <div className="form-row">
          <button type="submit" disabled={loading} className="btn primary">
            {editingContact ? "Update" : "Add contact"}
          </button>
          {editingContact && (
            <button type="button" onClick={onCancelEdit} className="btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
