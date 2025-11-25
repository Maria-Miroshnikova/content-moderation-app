import React from "react";
import cl from "./Card.module.css"
import { PRIORITY_HIGH, STATUS_ACCEPTED, STATUS_INPRROCESS, CATEGORY_NAMES } from "../../App";

const Card = ({props}) => {

    const getStatus = () => {
        if (props.status === STATUS_INPRROCESS)
            return "На модерации";
        else if (props.status === STATUS_ACCEPTED)
            return "Одобрена";
        else
            return "Отклонена";
    }

    const getPriority = () => {
        if (props.priority === PRIORITY_HIGH)
            return "Срочный";
        else
            return "Обычный";
    }

    const getCategory = () => {
        return CATEGORY_NAMES[props.category];
    }
    
    return(
        <div className={cl.card}>
            <img src={null}/>
            <div className={cl.description}>
                <p>{props.title}</p>
                <p>{props.cost}</p>
                <p>{getCategory()}</p>
            </div>
            <div className={cl.description}>
                <p>{getStatus()}</p>
                <p>{getPriority()}</p>
            </div>
            <button>Открыть</button>
        </div>
    )
}

export default Card;