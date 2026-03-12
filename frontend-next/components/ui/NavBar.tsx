import Link from 'next/link'
import cl from "../../styles/NavBar.module.css"

const NavBar = () => {
    return (
        <div className={cl.container}>
            <Link href={'/'}>Список объявлений</Link>
            <Link href={'/stats'}>Статистика</Link>
        </div>
    )
}

export default NavBar;