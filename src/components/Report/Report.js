import React, { useState } from "react";
import "../Registration/SignUp.css";
import axios from "axios";
const Report = () => {
  const reportValues = {
    ownerFullName: "",
    licenseNumber: "",
    color: "",
    type: "",
    description: "",
    status: "new",
    createdAt: new Date(),
    updateAt: new Date(),
    clientId: "a2hha2ltLnpodW1hZ2FsaXlldkBtYWlsLnJ1",
    approved: false
  };
  const [formValues, setFormValues] = useState(reportValues);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://84.201.129.203:8888/api/public/report", formValues)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    // axios
    //   .post("http://84.201.129.203:8888/api/cases", formValues)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    axios
      .create({
        baseURL: "/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bikeTheftAuthorization")}`,
        }
      })
      .post(`/api/cases`, formValues)
      .then(res => {
        console.log(res)
      });
  };
  return (
    <div className="container">
      <h1>Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="status-message">
            <label htmlFor="name">Full Name</label>
            <div className="error-container"></div>
          </div>
          <input
            type="text"
            name="ownerFullName"
            id="ownerFullName"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="status-message">
            <label htmlFor="license">Number of License</label>
            <div className="error-container"></div>
          </div>

          <input
            type="text"
            name="licenseNumber"
            id="licenseNumber"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="status-message">
            <label htmlFor="color">Color</label>
            <div className="error-container"></div>
          </div>

          <input
            type="color"
            id="color"
            name="color"
            value="#ffffff"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="status-message">
            <label htmlFor="type">Type</label>
            <div className="error-container"></div>
          </div>
          <label>
            <input
              type="radio"
              name="type"
              value="sport"
              onChange={handleChange}
            />
            Sport
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="general"
              onChange={handleChange}
            />
            Basic
          </label>
        </div>
        <div className="form-row">
          <div className="status-message">
            <label htmlFor="descr">Description</label>
            <div className="error-container"></div>
          </div>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Report;
