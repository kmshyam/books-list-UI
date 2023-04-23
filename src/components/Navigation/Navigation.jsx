import React from "react";
import classes from "./Navigation.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button/Button";

const Navigation = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("TOKEN");
    navigate("../auth/signin");
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes["child-container"]}>
        <div className={classes.logo}>
          <h1>Books Center</h1>
        </div>
        <div className={classes.user}>
          <Button className={classes["user-actions"]}>
            <div className={classes.icons}>
              <FontAwesomeIcon icon={faPowerOff} className={classes.icon} />
            </div>
            <p className={classes.detail} onClick={logoutHandler}>
              Logout
            </p>
          </Button>
        </div>
      </div>
      <section className={classes["content-section"]}>
        <Outlet />
      </section>
    </div>
  );
};

export default Navigation;
