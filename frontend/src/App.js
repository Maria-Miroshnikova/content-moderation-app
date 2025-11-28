

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdsPage, { FILTER_DEFAULT, SORT_DEFAULT } from './pages/AdsPage';
import AdsDetailPage from './pages/AdsDetailPage';
import { FilterAndSortContext } from './context';
import { useState } from 'react';
import StatisticsPage from './pages/StatiscticsPage';


function App() {

  const routes = [
    { path: '/list', element: AdsPage, exact: true },
    //{path: '/posts', element: Posts, exact: true},
    { path: '/item/:id', element: AdsDetailPage, exact: true },
    { path: '/stats', element: StatisticsPage, exact: true }
  ]

  const [sort, setSort] = useState({
    "type": SORT_DEFAULT,
    "sort_up": true
  })

  const [filter, setFilter] = useState(FILTER_DEFAULT)
  // idPage - хранит номер карточки в фильтрованном и сортированном списке, в форме от 1 до totalItems
  // его посылают на сервер в качестве page чтобы получить данный элемент через getAll(limit = 1, page = idPage)
  // за его корректное вычисление отвечает CardList, idPage = limit * (page - 1) + index + 1,
  // где page - выбранная страница из пагинации, index - индекс в массиве карточек
  // этим значением так же управляют кнопки (пред/след) на странице детального просмотра
  const [idPage, setIdPage] = useState()
  const [totalItems, setTotalItems] = useState()

  return (
    <FilterAndSortContext.Provider value={{ filter, setFilter, sort, setSort, idPage, setIdPage, totalItems, setTotalItems}}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) =>
            <Route
              path={route.path}
              element={<route.element />}
              exact={route.exact}
            />)
          }
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </BrowserRouter>
    </FilterAndSortContext.Provider>
  )
}

export default App;
