import React from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

function App() {
  const [contacts, setContacts] = React.useState([]);

  // mengambil data contact sebelumnya dan menambahkan data baru untuk ditampilkan di list, jika method ini dihapus, data kontak sebelumnya akan di ganti oleh data baru di list
  const addContactHandler = (contact) => {
    console.log(contact);
    // menambahkan data ke local strotage
    localStorage.setItem("contacts", JSON.stringify([...contacts, contact]));
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  // menghapus contact dari list
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    // di setiap ada handler yang memiliki fungsi CRUD, pastikan ada setState di dalamnya oncom!
    setContacts(newContactList);
  };
  // Mencegah data agar tidak hilang saat halaman ter-refresh menggunakan localStorage

  // mengambil data dari local storage
  React.useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem("contacts"));
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []); // jika depedencynya tidak dihapus, maka akan looping teu ereun-ereun

  return (
    <>
      <Header />
      <div className="main-container mt-5">
        <AddContact addContactHandler={addContactHandler} />
        <div className="contact-list">
          <ContactList
            contacts={contacts}
            getContactId={removeContactHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
