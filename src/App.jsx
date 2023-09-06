import { useState } from "react";
import "./App.css";
import { registerUser } from "./services/registerUser";
import { useEffect } from "react";

export function App() {
  const [field, setField] = useState({
    email: "",
    name: "",
    age: "",
    password: "",
    passwordCheck: "",
    check: false,
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    age: "",
    password: "",
    passwordCheck: "",
    check: "",
  });
  const [enableButton, setEnableButton] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(field);
  };

  function handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
  }
  const handleCheckboxChange = (e) => {
    // const { name, checked } = e.target;
    const name = e.target.name;
    const checked = e.target.checked;
    setField({ ...field, [name]: checked });
  };

  useEffect(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (field.email == "")
      setError((error) => ({ ...error, email: "email is required" }));
    else if (!emailRegex.test(field.email))
      setError((error) => ({ ...error, email: "email is invalid" }));
    else setError((error) => ({ ...error, email: "" }));

    if (field.name == "")
      setError((error) => ({ ...error, name: "name is required" }));
    else setError((error) => ({ ...error, name: "" }));

    if (field.age.length === 0)
      setError((error) => ({ ...error, age: "age is required" }));
    else if (field.age < 17)
      setError((error) => ({
        ...error,
        age: "you must be above 18 to register",
      }));
    else setError((error) => ({ ...error, age: "" }));

    if (field.password == "")
      setError((error) => ({ ...error, password: "password is required" }));
    else if (field.password.length < 5)
      setError((error) => ({ ...error, password: "password is too short" }));
    else setError((error) => ({ ...error, password: "" }));

    if (field.password !== field.passwordCheck)
      setError((error) => ({
        ...error,
        passwordCheck: "passwords do not match",
      }));
    else setError((error) => ({ ...error, passwordCheck: "" }));

    if (field.check !== false) setError((error) => ({ ...error, check: "" }));
    else
      setError((error) => ({
        ...error,
        check: "please read and accept the terms and conditions",
      }));

    if (
      field.email &&
      field.name &&
      field.age &&
      field.password &&
      field.passwordCheck &&
      field.check
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [
    field.email,
    field.name,
    field.age,
    field.password,
    field.passwordCheck,
    field.check,
  ]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={field.email}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Email"
            />
          </label>
          <span className="error" role="alert">
            {error.email}
          </span>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Name"
            />
          </label>
          <span className="error" role="alert">
            {error.name}
          </span>
        </div>
        <div>
          <label>
            Age
            <input
              type="number"
              name="age"
              value={field.age}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Age"
            />
          </label>
          <span className="error" role="alert">
            {error.age}
          </span>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={field.password}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Password"
            />
          </label>
          <span className="error" role="alert">
            {error.password}
          </span>
        </div>
        <div>
          <label>
            Password check
            <input
              type="password"
              name="passwordCheck"
              value={field.passwordCheck}
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Password check"
            />
          </label>
          <span className="error" role="alert">
            {error.passwordCheck}
          </span>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="check"
              checked={field.check}
              onChange={(e) => {
                handleCheckboxChange(e);
              }}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          <span className="error" role="alert">
            {error.check}
          </span>
        </div>

        <button type="submit" disabled={!enableButton}>
          Sign up
        </button>
      </form>
    </div>
  );
}
