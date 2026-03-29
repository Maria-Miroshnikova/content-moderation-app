import cl from "../styles/DescriptionPanel.module.css"
import { IAd } from "../types/server_types";

interface DescriptionPanelProps {
    data: IAd
}

const DescriptionPanel = ({ data }: DescriptionPanelProps) => {

    function getYearsRegistered(dateString) {
        const registered = new Date(dateString);
        const now = new Date();

        const diffMs = now.getTime() - registered.getTime();
        const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365);

        return Math.floor(diffYears); // TODO: полные годы потом дополнить до месяцев
    }

    return (
            <div className={cl.desc_container}>
                <p><b>Полное описание:</b> {data.description}</p>
                <p><b>Характеристики</b></p>
                <table>
                    <tbody>
                        {Object.entries(data.characteristics).map((i, index) => {
                            return (
                                <tr key={index}>
                                    <td>{i[0]}</td>
                                    <td>{i[1]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p><b>Продавец:</b> {data.seller.name} | рейтинг {data.seller.rating}</p>
                <p>{data.seller.totalAds} объявлений | На сайте: {getYearsRegistered(data.seller.registeredAt)} лет </p>
            </div>
        )
}

export default DescriptionPanel;