import { Outlet, Navigate } from 'react-router'

import { getIsLogged } from '../utility/auth'

export default function AuthLayout() {
    const isLogged = getIsLogged()

    return isLogged ? <Outlet /> : <Navigate to='/login' />
}