import React from 'react';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts/Posts';
import { Container, Typography, Button, Grid } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container maxWidth="md" data-testid="posts-component">
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h2" gutterBottom>
                    Home Page
                </Typography>
                <Button
                    component={Link}
                    to="/create"
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </Grid>

            <Posts />
            
        </Container>
    );
};

export default Home;
