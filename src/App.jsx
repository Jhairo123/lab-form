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
  });
  const [error, setError] = useState({
    email: "",
    name: "",
    age: "",
    password: "",
    passwordCheck: "",
  });
  const [enableButton, setEnableButton] = useState(true);
  // const onSubmit = (data) => {
  //   registerUser(data);
  // };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (field.email == "") alert("email is required");
  }
  function handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
  }

  useEffect(() => {
    console.log(error);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (field.email === "") setError({ ...error, email: "email is required" });
    else if (!emailRegex.test(field.email))
      setError({ ...error, email: "email is invalid" });
    // else setError({ ...error, email: "" });
    else if (field.name === "")
      setError({ ...error, name: "name is required" });
    // else setError({ ...error, name: "" });
    else if (field.age.length === 0)
      setError({ ...error, age: "age is required" });
    else if (field.age < 17)
      setError({ ...error, age: "you must be above 18 to register" });
    else if (field.password === "")
      setError({ ...error, password: "password is required" });
    else if (field.password.length > 5)
      setError({ ...error, password: "password is too short" });
    // else setError({ ...error, password: "" });
    else if (field.passwordCheck !== field.password)
      setError({ ...error, passwordCheck: "passwords do not match" });
    else setError({ ...error, password: "" });
  }, [field.email, field.name, field.age, field.password, field.passwordCheck]);

  return (
    <div>
      <form>
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
            <input type="checkbox" />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          <span className="error" role="alert">
            {}
          </span>
        </div>

        <button onSubmit={handleOnSubmit} disabled={true}>
          Sign up
        </button>
      </form>
    </div>
  );
}
