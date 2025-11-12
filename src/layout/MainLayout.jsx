import React from 'react';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { Outlet } from 'react-router';
import Footer from '../components/Footer'

const MainLayout = () => {
    return (
        <div>
            <ThemeProvider>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            </ThemeProvider>
        </div>
    );
};

export default MainLayout;