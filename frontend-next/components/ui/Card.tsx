import React, { useContext } from "react";
import cl from "../../styles/Card.module.css"
import { ICard } from "../../types/local_types";
import { PRIORITY_META, STATUS_META } from "../../types/enums";
import Link from "next/link";



interface CardProps {
    card: ICard,
    id: number // это не id карточки
}

const Card = ({ card, id }: CardProps) => {

    //const { idPage, setIdPage } = useContext(FilterAndSortContext);

    //const navigate = useNavigate();

    //console.log("id: ", id)

    /*   const handleClick = (e) => {
           e.preventDefault();
           //console.log("id: ", id)
           setIdPage(id);
   
           navigate(`/item/${Number(props.id)}`);
       }*/

    //console.log(props)

    //console.log(card)

    // TODO: next умеет лучше отрисовывать картинки!!!
    return (
        <div className={cl.card}>
            <img src={card.img} />
            <div className={cl.description}>
                <p>{card.title}</p>
                <p>{card.cost}</p>
                <p>{card.categoryName}</p>
            </div>
            <div className={cl.description}>
                <p>{card.date}</p>
                <p>{STATUS_META[card.status].title}</p>
                <p>{PRIORITY_META[card.priority].title}</p>
                <Link
                    href={{
                        pathname: `/${card.id}`,
                        //query: { filter: filter, page: 2 }
                    }}
                >
                    <button
                        className={cl.panel_btn}>посмотреть</button>
                </Link>
            </div>
        </div>
    )
}

// todo добавить в конец
//<Link to={`/item/${Number(props.id)}`} onClick={(e) => handleClick(e)} className={cl.panel_btn}>Открыть</Link>

export default Card;