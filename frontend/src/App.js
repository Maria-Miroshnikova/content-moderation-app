

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdsPage from './pages/AdsPage';
import AdsDetailPage from './pages/AdsDetailPage';


function App() {

  const routes = [
    { path: '/list', element: AdsPage, exact: true },
    //{path: '/posts', element: Posts, exact: true},
    {path: '/item', element: AdsDetailPage, exact: true}
  ]

  return (
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
  )
}

export default App;
