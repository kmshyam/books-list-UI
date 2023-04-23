import React, { useEffect, useRef, useState } from "react";
import classes from "./BookAddForm.module.css";
import Button from "../UI/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const BookEditForm = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const bookData = location.state.data;
  console.log(bookData);

  useEffect(() => {
    setTitle(bookData.title);
    setIsbn(bookData.isbn);
    setAuthor(bookData.author);
    setDescription(bookData.description);
    setPublishedDate(bookData.published_date);
    setPublisher(bookData.publisher);
    setGenre(bookData.genre);
  }, []);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const isbnChangeHandler = (e) => {
    setIsbn(e.target.value);
  };
  const authorChangeHandler = (e) => {
    setAuthor(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const publishedDateChangeHandler = (e) => {
    setPublishedDate(e.target.value);
  };
  const publisherChangeHandler = (e) => {
    setPublisher(e.target.value);
  };
  const genreChangeHandler = (e) => {
    setGenre(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("TOKEN");

    const book = {
      title: title,
      isbn: isbn,
      author: author,
      description: description,
      published_date: publishedDate,
      publisher: publisher,
      genre: genre,
    };

    fetch(
      `https://books-list-backend.onrender.com/api/books/edit/${bookData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(book),
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

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <section className={classes.header}>
        <h2>Edit Book</h2>
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
            onChange={titleChangeHandler}
            value={title}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="isbn"
            id="isbn"
            placeholder="ISBN"
            onChange={isbnChangeHandler}
            value={isbn}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            onChange={authorChangeHandler}
            value={author}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Describe the book"
            onChange={descriptionChangeHandler}
            value={description}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="published_date"
            id="published_date"
            placeholder="Published date (yyyy-mm-dd)"
            onChange={publishedDateChangeHandler}
            value={publishedDate}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="publisher"
            id="publisher"
            placeholder="Publisher of this book"
            onChange={publisherChangeHandler}
            value={publisher}
            required
          />
        </div>
        <div className={classes["form-control"]}>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Genre"
            onChange={genreChangeHandler}
            value={genre}
            required
          />
        </div>
        <div className={classes["form-actions"]}>
          <Button className={classes.btn} type="submit">
            Update Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookEditForm;
