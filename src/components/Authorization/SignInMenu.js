import React, { useState } from "react";
import "../Registration/SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const SignInMenu = () => {
  let history = useHistory();
  const intialValues = { email: "", password: "" };
  const [isError, setIsError] = useState(false);
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});

  //input change handler
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = e => {
    console.log("clicked");
    e.preventDefault();
    if (isError === true) {
      setFormErrors(validate(formValues));
    } else {
      axios
        .create({
          baseURL: "http://84.201.129.203:8888/api/",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .post(`/auth/sign_in`, formValues)
        .then(res => {
          if (res.status === 200) {
            const token = res.data.token;
            localStorage.setItem(
              "bikeTheftAuthorization",
              JSON.stringify({ token, isAuth: true })
            );
            history.push("/");
          } else {
            alert(res.statusText);
          }
        });
    }
  };

  //form validation handler
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Cannot be blank";
      setIsError(true);
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
      setIsError(true);
    }
    return errors;
  };

  return (
    <div className="body-container">
      <div className="container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit} noValidate>
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};
export default SignInMenu;
