import React, { useEffect, useState } from 'react'
import { OpinionType} from '../Type'
import FetchApi from '../FetchApi'
import like from "../like.png"
import sad from "../sad.png"
import OpinionUpdate from './OpinionUpdate'

type BookType = {
  bookId: number,

}

export function FetchOpinions(props: BookType) {
    const[form,setForm]=useState<boolean>(false)
    const [Opinions, setOpinions] = useState<OpinionType[]>()
    useEffect(()=> {

        FetchApi('http://localhost:5133/api/Opinions').then(opinions => setOpinions(opinions))
    },[])
    console.log(Opinions?.at(0)?.like)
    const OppinionFiltered = Opinions?.filter(opinion => opinion.bookId==props.bookId)
   const activationForm=()=>{
    setForm(true);
   }

  return (
    <>
    <div className='opinioncard'>
    {
        OppinionFiltered?.map((opinion,index)=>(
            <>
            <p key={index}>{!opinion.like && <img src={sad} alt="sad"/>} <div>{opinion.view}   </div> <div> {opinion.userName}</div>
            {opinion.like && <img src={like} alt="like"/>}
            </p>
            <button onClick={activationForm} >Modification</button>
            {form && <OpinionUpdate opinionId={opinion.opinionId} view={opinion.view} userName={opinion.userName} like={opinion.like}/>}
            </>
            
            
        ))
    }
    </div>
    
    </>
    
  )
}

