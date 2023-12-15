import React from 'react';
import { Typography, Container } from '@mui/material';
import PostForm from '../components/Posts/PostForm';
import usePostDetails from '../hooks/usePostDetails';
import Loading from '../components/Common/Loading';
import NotificationDialog from '../components/Common/NotificationDialog';
import NotificationSnackbar from '../components/Common/NotificationSnackbar';

const Create: React.FC = () => {
	const {
        post,
		loading,
		error,
		successMessage,
		dialogMessage,
		createPost,
		handleCloseSuccessMessage
	} = usePostDetails({});

	return (
		<Container maxWidth="md">
			<Typography variant="h2" gutterBottom>
				Create Page
			</Typography>
			{loading ? (
				<Loading />
			) : (
				<>
					<PostForm post={post} onUpdate={createPost} onDelete={() => {}} />
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

export default Create;
