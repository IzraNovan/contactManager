import React from "react";
import ContactCard from "./ContactCard";
import Swal from "sweetalert2";

function ContactList(props) {
  console.log(props);
  // mengambil id dari props saat button delete di klik, data akan di oper ke props getContactId di App.js
  const deleteContactHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        props.getContactId(id);
        Swal.fire("Deleted!", "Contact has been deleted.", "success");
      }
    });
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
