import React, { useRef } from "react";
import classes from "./BookAddForm.module.css";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";

const BookAddForm = () => {
  const titleRef = useRef();
  const isbnRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const publishedDateRef = useRef();
  const publisherRef = useRef();
  const genreRef = useRef();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");
    const enteredTitle = titleRef.current.value;
    const enteredIsbn = isbnRef.current.value;
    const enteredAuthor = authorRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredPublishedDate = publishedDateRef.current.value;
    const enteredPublisher = publisherRef.current.value;
    const enteredGenre = genreRef.current.value;

    const book = {
      title: enteredTitle,
      isbn: enteredIsbn,
      author: enteredAuthor,
      description: enteredDescription,
      published_date: enteredPublishedDate,
      publisher: enteredPublisher,
      genre: enteredGenre,
    };

    fetch("https://books-list-backend.onrender.com/api/books/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(book),
    })
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

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <section className={classes.header}>
        <h2>Add Book</h2>
        <Button className={classes.btn} onClick={clickHandler}>
          Show Book List
        </Button>
      </section>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title of the book"
            ref={titleRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="isbn"
            id="isbn"
            placeholder="ISBN"
            ref={isbnRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            ref={authorRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Describe the book"
            ref={descriptionRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="published_date"
            id="published_date"
            placeholder="Published date (yyyy-mm-dd)"
            ref={publishedDateRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="publisher"
            id="publisher"
            placeholder="Publisher of this book"
            ref={publisherRef}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Genre"
            ref={genreRef}
            required
          />
        </div>
        <div className={classes["form-actions"]}>
          <Button className={classes.btn} type="submit">
            Add Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookAddForm;
