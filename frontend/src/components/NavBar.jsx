import { Link } from "react-router-dom";
import cl from "./NavBar.module.css"

const NavBar = () => {


    return (
        <div className={cl.container}>
            <Link to={'/list'}>Список объявлений</Link>
            <Link to={'/stats'}>Статистика</Link>
        </div>
    )
}

export default NavBar;