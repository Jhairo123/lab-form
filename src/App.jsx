import { useState } from "react";
import "./App.css";
import { registerUser } from "./services/registerUser";
import { useEffect } from "react";


function getErrorMessageForField(name, value, value2) {
  if(value === ''){
    return `${name} is required`;
  }
  if(value){
    switch (name) {
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value.toString())) {
          return "email is invalid";
        } else {
          return "";
        }
      case "age":
        if (value < 18) {
          return "you must be above 18 to register";
        }
        break;
      case "password":
        if (value.length < 6) {
          return "password is too short";
        }
        break;
      case "passwordCheck":
        if (value !== value2) {
          return "passwords do not match";
        }
        break;
      default:
        return "";
    }
  }
 
}

export function App() {
  const [field, setField] = useState(undefined);

  const [error, setError] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    password: undefined,
    passwordCheck: undefined,
  });
  const [enableButton, setEnableButton] = useState(true);

  const onSubmit = (data) => {
    registerUser(data);
  };

 
  function handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setField({ ...field, [name]: value });
    validarObjetoDefinido(field)
    console.log(field,error)
  }

  function validarObjetoDefinido(obj,error) {
    for (const key in obj) {
      if (obj[key] === undefined) {
        setEnableButton(true && !validarObjeto(error)); // Si encuentra al menos una propiedad indefinida, retorna false
      }
    }
    setEnableButton(false && !validarObjeto(error)); // Si todas las propiedades están definidas, retorna true
  }

  function validarObjeto(obj) {
    if(obj){
      return Object.values(obj).every(value => value === undefined || value === "" || value === null);
    }else{
      return false
    }
    
  }

  useEffect(() => {
    if(field){
      setError(
        {
          email: getErrorMessageForField('email',field.email),
          name: getErrorMessageForField('name',field.name),
          age: getErrorMessageForField('age',field.age),
          password: getErrorMessageForField('password',field.password),
          passwordCheck: getErrorMessageForField('passwordCheck',field.password, field.passwordCheck)
        }
      )
    }
  }, [field]);


  return (
    <div>
      <form>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              // value={field.email}
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
              // value={field.name}
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
              // value={field.age}
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
              // value={field.password}
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
              // value={field.passwordCheck}
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

        <button onSubmit={onSubmit} disabled={enableButton}>
          Sign up
        </button>
      </form>
    </div>
  );
}
