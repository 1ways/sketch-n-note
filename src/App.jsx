import { BrowserRouter, Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import BoardPage from './pages/BoardPage'

import PageLayout from './layouts/PageLayout'
import AuthLayout from './layouts/AuthLayout'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route index element={<HomePage />}/>
                    <Route path='signup' element={<SignupPage />}/>
                    <Route path='login' element={<LoginPage />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path='board' element={<BoardPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}