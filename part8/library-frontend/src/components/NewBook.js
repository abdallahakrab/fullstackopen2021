import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
// # mutation addBookMutation(
//   #   $addBookTitle: String!
//   #   $addBookAuthor: String!
//   #   $addBookGenres: [String]!
//   #   $addBookPublished: Int
//   # ) {
//   #   addBook(
//   #     title: $addBookTitle
//   #     author: $addBookAuthor
//   #     genres: $addBookGenres
//   #     published: $addBookPublished
//   #   ) {
//   #     title
//   #     id
//   #     author
//   #     published
//   #     genres
//   #   }
//   # }
const ADD_BOOK = gql`
  mutation AddBookMutation(
    $title: String!
    $author: String!
    $genres: [String]!
    $published: Int
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK);
  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");
    console.log(title);

    const response = await addBook({
      variables: {
        title,
        author,
        genres,
        published,
      },
    });

    console.log(response);
    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
