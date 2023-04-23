import React from "react";
import classes from "./BookDetail.module.css";
import Button from "../UI/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const BookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookData = location.state.data;

  const clickHandler = () => {
    navigate("/");
  };

  const editHandler = () => {
    console.log(bookData);
    navigate("edit", {
      state: {
        data: bookData,
      },
    });
  };

  const deleteHandler = () => {
    const token = localStorage.getItem("TOKEN");
    fetch(
      `https://books-list-backend.onrender.com/api/books/delete/${bookData._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <section className={classes.header}>
        <h2>Book Detail</h2>
        <Button className={classes.btn} onClick={clickHandler}>
          Show Book List
        </Button>
      </section>
      <section className={classes["book-detail-section"]}>
        <div className={classes.detail}>
          <p>1.</p>
          <p className={classes.heading}>Title</p>
          <p>{bookData.title}</p>
        </div>
        <div className={classes.detail}>
          <p>2.</p>
          <p className={classes.heading}>Author</p>
          <p>{bookData.author}</p>
        </div>
        <div className={classes.detail}>
          <p>3.</p>
          <p className={classes.heading}>ISBN</p>
          <p>{bookData.isbn}</p>
        </div>
        <div className={classes.detail}>
          <p>4.</p>
          <p className={classes.heading}>Publisher</p>
          <p>{bookData.publisher}</p>
        </div>
        <div className={classes.detail}>
          <p>5.</p>
          <p className={classes.heading}>Published Date</p>
          <p>{bookData.published_date}</p>
        </div>
        <div className={classes.detail}>
          <p>6.</p>
          <p className={classes.heading}>Description</p>
          <p>{bookData.description}</p>
        </div>
        <div className={classes.detail}>
          <p>7.</p>
          <p className={classes.heading}>Genre</p>
          <p>{bookData.genre}</p>
        </div>
        <div className={classes.actions}>
          <Button className={classes.edit} onClick={editHandler}>
            Edit Book
          </Button>
          <Button className={classes.delete} onClick={deleteHandler}>
            Delete Book
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
