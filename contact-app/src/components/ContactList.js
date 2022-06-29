import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import Swal from "sweetalert2";

function ContactList(props) {
  console.log(props);
  const inputSearch = useRef();
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

  const getKeyword = () => {
    props.keyword(inputSearch.current.value);
  };

  return (
    <>
      <h4 className="text-center mt-5 d-flex justify-content-between p-3">
        Contact List
        <Link to="/">
          <button className="btn btn-primary">Add New Contact</button>
        </Link>
      </h4>
      <form
        className="d-flex mb-3 justify-content-center mx-auto"
        role="search"
        style={{ width: "70%" }}
      >
        <input
          ref={inputSearch}
          className="form-control me-2"
          type="search"
          placeholder="Search Contact"
          aria-label="Search"
          value={props.search}
          onChange={getKeyword}
        />
        <button className="btn btn-outline-success" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
      <ol className="list-group list-group-numbered">{renderContactlist}</ol>
    </>
  );
}

export default ContactList;
