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
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

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

  // update data ke json api
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
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
                    contacts={search.length < 1 ? contacts : searchResult}
                    getContactId={removeContactHandler}
                    search={search}
                    keyword={searchHandler}
                  />
                </div>
              }
            />

            <Route
              path="/edit"
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
