import cl from "../styles/GalleryPanel.module.css"

interface GalleryPanelProps {
    images: string[]
}

const GalleryPanel = ({images} : GalleryPanelProps) => {
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