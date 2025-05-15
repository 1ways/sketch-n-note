import { Outlet } from 'react-router'

import Footer from '../components/Footer'

export default function PageLayout() {
    return (
        <div className="container">
            <Outlet />
            <Footer />
        </div>
    )
}