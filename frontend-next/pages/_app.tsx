import { FilterAndSortProvider } from '../context/index';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return (
        <FilterAndSortProvider>
            <Component {...pageProps} />
        </FilterAndSortProvider>
    );
}