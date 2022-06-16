import React, { Component } from "react";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
  };

  handleAdd = (e) => {
    // menghapus perilaku default dari submit agar tidak merefresh halaman, jika method ini dihapus, maka saat halaman te- refresh, data yang diinputkan akan hilang
    e.preventDefault();
    // mengatasi user agar tidak meng-inputkan data kosong
    if (this.state.name === "" || this.state.email === "") {
      alert("Please enter a name and email!");
    }
    // menghapus field/input saat menekan tombol add (data tetap terkirim)
    this.setState({ name: "", email: "" });
    // mengirim data terbaru ke method di parent component
    this.props.addContactHandler(this.state);
    // Component App.js juga akan menerima data terbaru dari AddContact.js
    console.log(this.state);
  };

  render() {
    return (
      <>
        <h3 className="text-center mb-2">Add Contact</h3>

        <form onSubmit={this.handleAdd}>
          <hr />

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.name}
              required
              // agar field bisa mutable dan tidak ReadOnly
              onChange={(e) => this.setState({ name: e.target.value })}
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
              value={this.state.email}
              required
              // agar field bisa mutable dan tidak ReadOnly
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>

          <hr />
        </form>
      </>
    );
  }
}

export default AddContact;
