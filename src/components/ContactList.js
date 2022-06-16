import React from "react";
import ContactCard from "./ContactCard";

function ContactList(props) {
  console.log(props);
  // mengambil id dari props saat button delete di klik, data akan di oper ke props getContactId di App.js
  const deleteContactHandler = (id) => {
    console.log(id);
    props.getContactId(id);
  };

  // Untuk merender contactList dan menambah contactCard baru saat form menerima submit data
  const renderContactlist = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
        clickHandler={deleteContactHandler}
      />
    );
  });

  return (
    <>
      <h4 className="text-center mt-5">Contact List</h4>
      <ol className="list-group list-group-numbered">{renderContactlist}</ol>
    </>
  );
}

export default ContactList;
