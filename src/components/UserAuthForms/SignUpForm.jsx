import React, { useRef } from "react";
import classes from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";

const SignUpForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cpasswordInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    fetch("https://books-list-backend.onrender.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("../auth/signin");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className={classes.container}>
      <h1 className={classes.heading}>SignUp Form</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            ref={cpasswordInputRef}
            required
          />
        </div>
        <div>
          <Button type="submit" className={classes.btn}>
            SignUp
          </Button>
        </div>
      </form>
      <p className={classes.checkAuth}>
        Already Registered? <Link to="../auth/signin">Login</Link>
      </p>
    </section>
  );
};

export default SignUpForm;
