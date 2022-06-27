import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = (props) => {
  const location = useLocation();
  // define navigate
  let navigate = useNavigate();

  const { id, name, email } = location.state.contact;
  const [contactId] = React.useState(`${id}`);
  const [contactName, setName] = React.useState(`${name}`);
  const [contactEmail, setEmail] = React.useState(`${email}`);

  const handleEdit = (e) => {
    // menghapus perilaku default dari submit agar tidak merefresh halaman, jika method ini dihapus, maka saat halaman te- refresh, data yang diinputkan akan hilang
    e.preventDefault();
    // mengirim data terbaru ke method di parent component (App.js)
    props.updateContactHandler({ contactId, contactName, contactEmail });
    // menghapus field/input saat menekan tombol add (data tetap terkirim)
    setName("");
    setEmail("");
    // menuju route contact list saat menekan tombol add ditekan / data dikirim
    navigate("/list");
  };

  return (
    <>
      <h3 className="mb-2">Edit Contact</h3>

      <form onSubmit={handleEdit}>
        <hr />
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={contactName}
            required
            // agar field bisa mutable dan tidak ReadOnly
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={contactEmail}
            required
            // agar field bisa mutable dan tidak ReadOnly
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default EditContact;
