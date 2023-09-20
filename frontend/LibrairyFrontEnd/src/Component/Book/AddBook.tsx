import { useEffect, useState } from "react";
import { BookType } from "../../Type";
import FetchApi from "../../FetchApi";
import url from "../../Url";
import love from "../../media/love.png";
import sad from "../../media/sad.png";
import "./Book.css";

function AddBook() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [view, setView] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [books, setBooks] = useState<BookType[]>([]);

  const PostBook = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    };
    const response = await fetch(
      url+"api/Book",
      requestOptions
    );
    const body = await response.json();
    books?.push(body);
    setBooks(books);

    return body;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await FetchApi(
          url+"api/Book"
        );
        setBooks(booksData.$values);
      } catch (error) {
        console.error("error fetching books:", error);
      }
    };
    fetchBooks;
  }, []);

  const PostOpinion = async (bookId: number, rate: number) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rate: rate,
        view: view,
        userName: userName,
      }),
    };
    const newOpinion = await (
      await fetch(
        url+"api/Opinion",
        requestOptions
      )
    ).json();
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action={url+"api/Book"}
        method="POST"
        className="bookform"
      >
        <div className="bookform__inputs">
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <textarea
            className="bookform__view input"
            placeholder="View"
            value={view}
            onChange={(e) => setView(e.target.value)}
          />

          <input
            className="input"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button bookform__button"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 0);
            }}
          >
            Add
            <img className="icone iconeRate" src={sad} />
          </button>

          <button
            className="button bookform__button"
            type="submit"
            onClick={async () => {
              PostOpinion((await PostBook()).bookId, 1);
            }}
          >
            Add
            <img className="icone iconeRate" src={love} />
          </button>
        </div>
      </form>
      {/* <Books /> */}
    </>
  );
}

export default AddBook;