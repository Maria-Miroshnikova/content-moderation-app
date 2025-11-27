import React from "react";
import cl from "./Card.module.css"
import { PRIORITY_HIGH, STATUS_ACCEPTED, STATUS_INPRROCESS, CATEGORY_NAMES, STATUS_DECLINED } from "../../App";
import img_placeholder from "../../img/img_placeholder.png"

const Card = ({props}) => {

    const getStatus = () => {
        if (props.status === STATUS_INPRROCESS)
            return "На модерации";
        else if (props.status === STATUS_ACCEPTED)
            return "Одобрена";
        else if (props.status === STATUS_DECLINED)
            return "Отклонена";
        else
            return "draft";
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
    
    //console.log(props)
    return(
        <div className={cl.card}>
            <img src={img_placeholder}/>
            <div className={cl.description}>
                <p>{props.title}</p>
                <p>{props.cost}</p>
                <p>{props.categoryName}</p>
            </div>
            <div className={cl.description}>
                <p>{props.date}</p>
                <p>{getStatus()}</p>
                <p>{getPriority()}</p>
            </div>
            <button className={cl.panel_btn}>Открыть</button>
        </div>
    )
}

export default Card;