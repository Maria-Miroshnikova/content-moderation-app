import cl from "./GalleryPanel.module.css"

const GalleryPanel = ({images}) => {
    return(
        <div className={cl.img_container}>
            {images !== undefined && images.map((i, index) => {
                return(
                    <img key={index} src={i}/>
                )
            })}
        </div>
    )
}

export default GalleryPanel;