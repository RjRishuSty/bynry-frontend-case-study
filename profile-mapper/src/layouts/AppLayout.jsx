import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
const AppLayout = ({mode,toggleMode}) => {
    return (
        <>
            <Header  mode={mode} toggleMode={toggleMode}/>
            <Outlet />
        </>
    )
}

export default AppLayout