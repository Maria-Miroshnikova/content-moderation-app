import React, { FC } from "react";
import { ISort } from "../types/types";
import { ESort, SORT_META } from "../types/enums";

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
                    {Object.entries(SORT_META).map(([id, meta]) => <option key={id} value={id}>{meta.title}</option>)}
                </select>

                {[ESort.DATE, ESort.COST].includes(sortSettings.type) && (
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