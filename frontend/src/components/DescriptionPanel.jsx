import cl from "./DescriptionPanel.module.css"

const DescriptionPanel = ({ data }) => {

    function getYearsRegistered(dateString) {
        const registered = new Date(dateString);
        const now = new Date();

        const diffMs = now - registered; // разница в миллисекундах
        const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365);

        return Math.floor(diffYears); // полные годы
    }

    if ((data !== undefined) && (data.seller !== undefined) && (data.seller.name !== undefined))
        return (
            <div className={cl.desc_container}>
                <p><b>Полное описание:</b> {data.description}</p>
                <p><b>Характеристики</b></p>
                <table>
                    {Object.entries(data.characteristics).map((i) => {
                        return (
                            <tr>
                                <td>{i[0]}</td>
                                <td>{i[1]}</td>
                            </tr>
                        )
                    })}
                </table>
                <p><b>Продавец:</b> {data.seller.name} | {data.seller.rating}</p>
                <p>{data.seller.totalAds} объявлений | На сайте: {getYearsRegistered(data.seller.registeredAt)} лет </p>
            </div>
        )
    else
        return (
            <div>
                hello
            </div>)
    //    console.log("Внутри disc panel: ", data.seller.name)
}

export default DescriptionPanel;