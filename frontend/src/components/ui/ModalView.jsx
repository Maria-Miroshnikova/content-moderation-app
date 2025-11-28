import React from "react";
import classes from "./ModalView.module.css"

const ModalView = ({children, isVisible, setIsVisible}) => {

    const rootClasses = [classes.myModalView]

    if (isVisible) {
        rootClasses.push(classes.active)
    }

    return(
        <div className={rootClasses.join(' ')} onClick={() => setIsVisible(false)}>
            <div className={classes.myModalViewContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalView;
