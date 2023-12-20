import { useEffect, useState, useContext } from "react";
import "./Opinion.css";
import { OpinionList } from "../OpinionList/OpinionList";
import {OPINION_BY_BOOKID_URL} from "../../../Url";
import modify from "../../media/write.svg";
import { Rate } from "../../Rates/Rate/Rate";
import { ThemeContext } from "../../App/App";

type OpinionType = {
  id: number;
  rate: number;
  view: string;
  userName: string;
  postDate: string;
  bookId: number;
};

type BookType = {
  book: {
    id: number;
    title: string;
    author: string;
    imageUrl?:string;
    averageRate?: number;
  };
  onEdit?: (opinionToUpdate: OpinionType) => void;
  toCreate: () => void;
  displayReview: (opinions: OpinionType[]) => void;
};

export const Opinion = ({
  book,
  onEdit,
  toCreate,
  displayReview,
}: BookType) => {
  const theme = useContext(ThemeContext);
  const [opinions, setOpinions] = useState<OpinionType[] | null>(null);
  const [fetching, setFething] = useState<boolean>(true);
  const [lastOpinion, setLastOpinion] = useState<OpinionType | null>(null);
  const FetchOpinionBYBookId = async (bookId: number) => {
    try {
      const response: Response = await fetch(
        OPINION_BY_BOOKID_URL + bookId
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setOpinions(responseData.$values);
        setFething(false);
      } else if (response.status === 404) {
        setFething(false);
        console.log("404 response", response);
      }
    } catch (error) {
      console.error("error fetching Opinions:", error);
    }
  };


  useEffect(() => {
    FetchOpinionBYBookId(book.id);
  }, []);

  useEffect(() => {
    opinions &&
      opinions.length > 0 &&
      setLastOpinion(opinions[opinions.length - 1]);
  }, [opinions]);

  if (fetching) {
    return <h2 className="OpinionLoading">Loading...</h2>;
  }

  return (
    <>
        {lastOpinion && (
          <div className={`opinionContainer opinionContainer--${theme}`}>
            <section className="opinionCardItems opinioncard__reviews--flex">
              <a className="opinionCardItems opinioncard__reviews__averageRate"
              onClick={() => {
                opinions && displayReview(opinions);
              }}>
                {book.averageRate}/5
              </a>
              <div className="rate_star opinioncard__reviews__star">
                &#9733;
              </div>
            </section>
          
          </div>
        )}
    </>
  );
};
