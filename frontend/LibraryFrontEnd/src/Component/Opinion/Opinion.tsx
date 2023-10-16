import { useEffect, useState, useContext } from "react";
import { OpinionType } from "../../Type";
import url from "../../Url";
import modify from "../../media/write.svg";
import { Rate } from "./Rate/Rate";


type EditOpinion = {
  id: number,
  rate: number,
  view: string,
  userName: string,
  bookId: number
};

type Opinion = {
  id: number,
  rate: number,
  view: string,
  userName: string,
  bookId: number
};

type BookType = {
  bookId: number;
  onEdit: (opinionToUpdate:EditOpinion) => void
};


export const Opinion = ({bookId, onEdit}: BookType) => {
  const [opinions, setOpinions] = useState<OpinionType[] | null >(null);
  const [lastOpinion, setLastOpinion] = useState<Opinion | null>(null);
  const FetchOpinions = async (bookId :number) => {
   try {
    const response : Response = await fetch(url + "api/Opinion/BookId=" + bookId);
    if(response.status === 200) {
      const responseData = await response.json();
        setOpinions(responseData.$values)
    } else if (response.status === 404){
      console.log(response)
    }
   } catch (error) {
    console.error("An error occurred:", error);
   }
  } 


  useEffect(() => {
    FetchOpinions(bookId);
  }, []);

  useEffect(()=> {
    opinions && opinions.length > 0 && setLastOpinion(opinions[opinions.length-1])
  },[opinions])
  
  if(!opinions) {
    return <h2 className="OpinionLoading">Loading...</h2>
  }

  return (
    <>
      <div className="opinioncontainer">
        {lastOpinion && (
          <div className="opinioncontainer--card" key={lastOpinion.id}>
            <div className="opinionCardItems" >
              <textarea
                className="opinionCardItems opinioncard--view"
                value={lastOpinion.view}
                readOnly
              />
              <div className="opinionCardItems">{lastOpinion.userName}</div>
              <Rate rate= {lastOpinion.rate}/>
            </div>
            <div className="opinionCardItems opinioncard--footer">
              <button
                className="button opinioncard--buttonmodify"
                onClick={() => {
                  const opinionToEdit:EditOpinion = {
                    id:lastOpinion.id,
                    rate: lastOpinion.rate,
                    view: lastOpinion.view,
                    userName:lastOpinion.userName,
                    bookId:lastOpinion.bookId
                  }
                  onEdit(opinionToEdit);
                }}
              >
                <img className="icone iconeModify" src={modify}></img>
                modify
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
