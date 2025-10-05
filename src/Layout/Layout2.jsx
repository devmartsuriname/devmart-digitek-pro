import { Outlet } from 'react-router-dom';
import Header2 from '../Components/Header/Header2';
import Footer2 from '../Components/Footer/Footer2';
import AnalyticsProvider from '../components/Analytics/AnalyticsProvider';

const Layout2 = () => {
    return (
        <AnalyticsProvider>
            <div className='main-page-area2'>
                {/* Skip to main content link for accessibility */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <Header2></Header2>
                <main id="main-content" role="main">
                    <Outlet></Outlet>
                </main>
                <Footer2></Footer2>
            </div>
        </AnalyticsProvider>
    );
};

export default Layout2;