import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import Button from "../UI/Button/Button";
import BookItem from "../BookItem/BookItem";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://books-list-backend.onrender.com/api/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data.books);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const clickHandler = () => {
    navigate("book/add");
  };

  const bookDetailHandler = (id) => {
    fetch(`https://books-list-backend.onrender.com/api/books/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate(`book/${data.book.title}`, {
          state: {
            data: data.book,
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <section className={classes.header}>
        <h2>All books</h2>
        <Button className={classes.btn} onClick={clickHandler}>
          + Add Book
        </Button>
      </section>
      <section className={classes["books-display-section"]}>
        <ul className={classes["books-list"]}>
          {books.map((book) => (
            <BookItem
              key={Math.random().toString()}
              id={book._id}
              title={book.title}
              author={book.author}
              description={book.description}
              genre={book.genre}
              onClick={bookDetailHandler}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
