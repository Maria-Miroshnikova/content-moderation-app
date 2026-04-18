"use client";

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import LinkButton from './LinkButton';

const NavBar = () => {
    return (
        <AppBar position='sticky'>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ gap: 2, height: 64, flexDirection: 'row', display: 'flex' }}>
                        <LinkButton path={'/'} label={'Список объявлений'} sx={{ my: 2, color: 'inherit'}}/>
                        <LinkButton path={'/stats'} label={'Статистика'} sx={{ my: 2, color: 'inherit'}}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;