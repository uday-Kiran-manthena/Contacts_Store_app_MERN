import api from "./api";
const getContacts = (page = 1) => api.get(`/api/contacts?page=${page}`);
const addContact = (payload) => api.post("/api/contacts", payload);
const updateContact = (id, payload) => api.put(`/api/contacts/${id}`, payload);
const deleteContact = (id) => api.delete(`/api/contacts/${id}`);
export default { getContacts, addContact, updateContact, deleteContact };
