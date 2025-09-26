import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ContactList({ contacts, onEdit, onDelete }) {
  if (!contacts?.length) {
    return <div className="card">No contacts yet</div>;
  }

  return (
    <div className="card contact-list">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.phone || "-"}</td>
              <td>{c.email || "-"}</td>
              <td className="action-icons">
                <FaEdit className="icon edit" onClick={() => onEdit(c)} />
                <FaTrash
                  className="icon delete"
                  onClick={() => onDelete(c._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
