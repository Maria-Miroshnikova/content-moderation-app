import cl from "./StatisticsPage.module.css"

const StatisticsPage = () => {
    return (
        <div className={cl.stats_page_layout}>
            <div className={cl.period_panel}>
                <p>Период: </p>
                <div className={cl.period_btns_container}>
                    <button>Сегодня</button>
                    <button>7д</button>
                    <button>30д</button>
                </div>
            </div>

            <div className={cl.stats_layout}>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        hello
                    </div>
                    <div className={cl.stats_panel}>
                        hello
                    </div>
                </div>
                <div className={cl.stats_container}>
                    <div className={cl.stats_panel}>
                        hello
                    </div>
                    <div className={cl.stats_panel}>
                        hello
                    </div>
                </div>
            </div>

            <div className={cl.graphic_container}>
                график активности
            </div>
            <div className={cl.graphic_container}>
                график решений
            </div>


        </div>
    )
}

export default StatisticsPage;