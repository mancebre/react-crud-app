import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Stack,
	Typography,
} from '@mui/material';

interface PostFormProps {
	post: null | {
		id: number;
		title: string;
		body: string;
	};
	onUpdate: (post: { id: number; title: string; body: string }) => void;
	onDelete: (postId: number) => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onUpdate, onDelete }) => {
	const validationSchema = Yup.object({
		title: Yup.string()
			.required('This field is mandatory')
			.min(3, 'Title must be at least 3 characters')
			.max(100, 'Title must be at most 100 characters'),
		body: Yup.string()
			.required('This field is mandatory')
			.min(10, 'Body must be at least 10 characters')
			.max(500, 'Body must be at most 500 characters'),
	});

	const formik = useFormik({
		initialValues: {
			title: post?.title || '',
			body: post?.body || '',
		},
		validationSchema,
		onSubmit: (values) => {
			onUpdate({ id: post?.id || 0, ...values });
		},
	});

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

	const handleDelete = () => {
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		onDelete(post?.id || 0);
		setIsDeleteDialogOpen(false);
	};

	const handleCancelDelete = () => {
		setIsDeleteDialogOpen(false);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<Typography variant='h4' gutterBottom>
					{post ? 'Edit' : 'Create'} Post
				</Typography>
				<TextField
					label='Title'
					required
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
					variant='outlined'
					{...formik.getFieldProps('title')}
				/>
				<TextField
					label='Body'
					required
					error={formik.touched.body && Boolean(formik.errors.body)}
					helperText={formik.touched.body && formik.errors.body}
					variant='outlined'
					multiline
					rows={4}
					{...formik.getFieldProps('body')}
				/>
				<Stack spacing={2} direction='row' justifyContent='flex-end'>
					{post && (
						<Button variant='contained' color='error' onClick={handleDelete}>
							Delete
						</Button>
					)}
					<Button type='submit' variant='contained' color='primary'>
						{post ? 'Update' : 'Create'}
					</Button>
				</Stack>
				<Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
					<DialogTitle>Confirm Delete</DialogTitle>
					<DialogContent>
						Are you sure you want to delete this post?
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancelDelete}>No</Button>
						<Button onClick={confirmDelete} color='error'>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</form>
	);
};

export default PostForm;
