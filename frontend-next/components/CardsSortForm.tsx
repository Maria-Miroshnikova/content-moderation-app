import React, { FC } from "react";
import { ESortId, ESortName, ISort } from "../types/types";

interface CardsSortFormProps {
    sortSettings: ISort,
    setSortSettings: React.Dispatch<React.SetStateAction<ISort>>
}

const CardsSortForm: FC<CardsSortFormProps> = ({ sortSettings, setSortSettings }) => {
    return (
        <div>
            <p>Сортировка:</p>
            <div className="sort">
                <select
                    value={sortSettings.type}
                    onChange={e => setSortSettings({ ...sortSettings, type: Number(e.target.value) })}
                >
                    <option value={ESortId.DEFAULT}>{ESortName.DEFAULT}</option>
                    <option value={ESortId.DATE}>{ESortName.DATE}</option>
                    <option value={ESortId.COST}>{ESortName.COST}</option>
                    <option value={ESortId.PRIORITY}>{ESortName.PRIORITY}</option>
                </select>

                {[ESortId.DATE, ESortId.COST].includes(sortSettings.type) && (
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