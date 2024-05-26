import Avatar from '../components/accounts/Avatar';
import SlidebarAccount from '../components/accounts/SlidebarAccount';
import React from 'react';
import { Grid, Box } from '@mui/material';

function AvatarPage() {
    return (
        <>
            <Grid container spacing={2}>
                <SlidebarAccount />
                <Avatar />
            </Grid>
        </>
    )
};

export default AvatarPage;