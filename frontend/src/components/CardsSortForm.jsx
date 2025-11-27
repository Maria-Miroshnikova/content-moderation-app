import React from "react";
import { SORT_COST, SORT_DATE, SORT_DEFAULT, SORT_NAMES, SORT_PRIORITY } from "../pages/AdsPage";

const CardsSortForm = ({ sortSettings, setSortSettings }) => {
    return (
        <div>
            <p>Сортировка:</p>
            <div className="sort">
                <select placeholder="сортировать по..."
                    value={sortSettings.type}
                    onChange={e => setSortSettings({ ...sortSettings, type: Number(e.target.value) })}
                >
                    <option value={SORT_DEFAULT}>Сортировать по...</option>
                    <option value={SORT_DATE}>{SORT_NAMES[0]}</option>
                    <option value={SORT_COST}>{SORT_NAMES[1]}</option>
                    <option value={SORT_PRIORITY}>{SORT_NAMES[2]}</option>
                </select>

                {[SORT_DATE, SORT_COST].includes(sortSettings.type) && (
                    <div className='checkbox'>
                        <input type="checkbox"
                            id="sort_up"
                            checked={sortSettings.sort_up}
                            onChange={e => setSortSettings({ ...sortSettings, sort_up: e.target.checked })}
                        />
                        <label htmlFor="sort_up">По возрастанию</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardsSortForm;