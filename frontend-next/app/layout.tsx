import { Metadata } from 'next';
import NavBar from '../components/ui/NavBar';
import { FilterAndSortProvider } from '../context/index';
import '../styles/global.css';

/*export default function App({ Component, pageProps }) {
    return (
        <FilterAndSortProvider>
            <Component {...pageProps} />
        </FilterAndSortProvider>
    );
}*/

export const metadata: Metadata = {
    title: "moder app",
    description: "moder app for applications on wepsite with ads"
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>
                <FilterAndSortProvider>
                    <NavBar />
                    {children}
                </FilterAndSortProvider>
            </body>
        </html>
    )
}