import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 as uuid } from "uuid";
import api from "../api/contacts";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = React.useState([]);

  // mengambil data contact sebelumnya dan menambahkan data baru untuk ditampilkan di list, jika method ini dihapus, data kontak sebelumnya akan di ganti oleh data baru di list
  const addContactHandler = async (contact) => {
    console.log(contact);
    // menambahkan data ke local strotage
    const request = { id: uuid(), ...contact };
    // klo dah pakai JSON API server, gak perlu localStorage
    // localStorage.setItem("contacts", JSON.stringify([...contacts, request]));

    // axios post call (add)
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  // fetch data contact dari api/JSON Server
  const retrieveContacts = async () => {
    // axios get call
    const response = await api.get("/contacts");
    return response.data;
  };

  // menghapus contact dari list
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    // di setiap ada handler yang memiliki fungsi CRUD, pastikan ada setState di dalamnya oncom!
    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.contactId}`, contact);
    const { contactId } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.contactId === contactId ? { ...response.data } : contact;
      })
    );
    console.log(response.data);
  };

  // Mencegah data agar tidak hilang saat halaman ter-refresh menggunakan localStorage

  // mengambil data dari local storage
  React.useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem("contacts"));
    // if (retrieveContacts) setContacts(retrieveContacts);

    // mengambil semua data contacts di json
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      // if this has a contact, i need to update the state
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []); // jika depedencynya tidak dihapus, maka akan looping teu ereun-ereun

  return (
    <>
      <Router>
        <Header />
        <div className="main-container mt-3">
          <Routes>
            <Route
              path="/"
              exact
              element={<AddContact addContactHandler={addContactHandler} />}
            />

            <Route
              path="/list"
              element={
                <div className="contact-list">
                  <ContactList
                    contacts={contacts}
                    getContactId={removeContactHandler}
                  />
                </div>
              }
            />

            <Route
              path="/edit"
              exact
              element={
                <EditContact updateContactHandler={updateContactHandler} />
              }
            />

            <Route path="/contact/:id" element={<ContactDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
