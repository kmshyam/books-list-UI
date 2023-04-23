import React from "react";
import classes from "./BookItem.module.css";
import bookImg from "../assets/BOC.jpg";

const BookItem = (props) => {
  const clickHandler = () => {
    props.onClick(props.id);
  };
  return (
    <li className={classes["book-item"]} onClick={clickHandler}>
      <div className={classes["book-img"]}>
        <img src={bookImg} alt={props.title} />
      </div>
      <div className={classes.details}>
        <h3 className={classes.title}>{props.title}</h3>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.genre}>{props.genre}</p>
      </div>
    </li>
  );
};

export default BookItem;
