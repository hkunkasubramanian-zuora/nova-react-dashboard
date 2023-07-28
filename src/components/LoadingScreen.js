import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate some asynchronous operation (e.g., fetching data from an API)
        // Replace the following setTimeout with your actual data loading process
        const fakeDataLoading = setTimeout(() => {
            setLoading(false); // Once loading is done, set loading to false
        }, 3000); // Simulate a 3-second loading time

        return () => clearTimeout(fakeDataLoading); // Clear the timeout on component unmount
    }, []);

    return (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingScreen;
