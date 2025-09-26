import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Pagination from "../components/Pagination";
import contactService from "../services/contactService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
  const [editing, setEditing] = useState(null);
  const { user } = useAuth();

  const fetchContacts = async (page = 1) => {
    try {
      const res = await contactService.getContacts(page);
      setContacts(res.data.contacts);
      setPageInfo({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      toast.error("Failed to load contacts");
    }
  };

  useEffect(() => {
    fetchContacts(1);
  }, []);

  const onSaved = () => {
    fetchContacts(pageInfo.currentPage);
    setEditing(null);
  };

  const onEdit = (contact) => setEditing(contact);
  const onCancelEdit = () => setEditing(null);

  const onDelete = async (id) => {
    try {
      await contactService.deleteContact(id);
      toast.success("Contact deleted");
      fetchContacts(pageInfo.currentPage);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const onPageChange = (p) => fetchContacts(p);

  return (
    <div className="page full-height">
      <Header />

      <div className="dashboard-container">
        {/* Left Form (30%) */}
        <div className="form-section">
          <ContactForm
            onSaved={onSaved}
            editingContact={editing}
            onCancelEdit={onCancelEdit}
          />
        </div>

        {/* Right List (70%) */}
        <div className="list-section">
          <h3 className="card-title">Your contacts</h3>
          <ContactList
            contacts={contacts}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <Pagination
            currentPage={pageInfo.currentPage}
            totalPages={pageInfo.totalPages}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
