import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import PostForm from '../components/Posts/PostForm';
import usePostDetails from '../hooks/usePostDetails';
import Loading from '../components/Common/Loading';
import NotificationDialog from '../components/Common/NotificationDialog';
import NotificationSnackbar from '../components/Common/NotificationSnackbar';

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {
        post,
        loading,
        error,
        successMessage,
        updatePost,
        deletePost,
        handleCloseSuccessMessage,
        dialogMessage,
    } = usePostDetails({ id: Number(id) });

    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>
                Details Page
            </Typography>

            {loading ? (
				<Loading />
            ) : (
                <>
                    {post && (
                        <PostForm post={post} onUpdate={updatePost} onDelete={deletePost} />
                    )}
                </>
            )}

            <NotificationSnackbar
				open={!!successMessage || !!error}
				onClose={handleCloseSuccessMessage}
				message={successMessage || error}
				success={!!successMessage}
			/>

            <NotificationDialog
                open={!!dialogMessage}
                onClose={handleCloseSuccessMessage}
                message={dialogMessage}
            />

        </Container>
    );
};

export default Details;
