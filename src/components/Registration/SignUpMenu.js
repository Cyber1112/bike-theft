import React, { useState, useEffect, useContext } from "react";
import "./SignUp.css";
import axios from "axios";
import { Redirect } from "react-router";

const SignUpMenu = () => {
  const [isError, setIsError] = useState(false)
  const intialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    repassword: "",
    clientId: "a2hha2ltLnpodW1hZ2FsaXlldkBtYWlsLnJ1",
    approved: false
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  //input change handler
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRegister = e => {
    const token = "";
    e.preventDefault();
    if(isError != false){
      axios
      .create({
        baseURL: "http://84.201.129.203:8888/api/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .post(`/auth/sign_up`, formValues)
      .then(response => response.data);
    }else{
      setFormErrors(validate(formValues));
    }
  };

  //form validation handler
  const validate = values => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Cannot be blank";
      setIsError(true)
    }
    if (!values.surname) {
      errors.surname = "Cannot be blank";
      setIsError(true)
    }
    if (!values.email) {
      errors.email = "Cannot be blank";
      setIsError(true)
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
      setIsError(true)
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
      setIsError(true)
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      setIsError(true)
    }
    if (!values.repassword) {
      errors.password = "Cannot be blank";
      setIsError(true)
    } else if (values.repassword !== values.password) {
      errors.password = "Password should be the same";
      setIsError(true)
    }

    return errors;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="body-container">
      <div className="container">
        <h1>Sign Up</h1>
        {Object.keys(formErrors).length === 0 && isSubmitting && (
          <span className="success-msg">Form submitted successfully</span>
        )}
        <form onSubmit={handleRegister} noValidate>
          <div className="form-row">
            <div className="status-message">
              <label htmlFor="name">Name</label>
              <div className="error-container">
                {formErrors.name && (
                  <span className="error">{formErrors.name}</span>
                )}
              </div>
            </div>

            <input
              type="name"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              className={formErrors.name && "input-error"}
            />
          </div>
          <div className="form-row">
            <div className="status-message">
              <label htmlFor="surname">Surname</label>
              <div className="error-container">
                {formErrors.surname && (
                  <span className="error">{formErrors.surname}</span>
                )}
              </div>
            </div>

            <input
              type="surname"
              name="surname"
              id="surname"
              value={formValues.surname}
              onChange={handleChange}
              className={formErrors.surname && "input-error"}
            />
          </div>
          <div className="form-row">
            <div className="status-message">
              <label htmlFor="email">Email</label>
              <div className="error-container">
                {formErrors.email && (
                  <span className="error">{formErrors.email}</span>
                )}
              </div>
            </div>

            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              className={formErrors.email && "input-error"}
            />
          </div>

          <div className="form-row">
            <div className="status-message">
              <label htmlFor="password">Password</label>
              <div className="error-container">
                {formErrors.password && (
                  <span className="error">{formErrors.password}</span>
                )}
              </div>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              className={formErrors.password && "input-error"}
            />
          </div>
          <div className="form-row">
            <div className="status-message">
              <label htmlFor="re-password">Re-Password</label>
              <div className="error-container">
                {formErrors.repassword && (
                  <span className="error">{formErrors.repassword}</span>
                )}
              </div>
            </div>
            <input
              type="password"
              name="repassword"
              id="repassword"
              value={formValues.repassword}
              onChange={handleChange}
              className={formErrors.repassword && "input-error"}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default SignUpMenu;
