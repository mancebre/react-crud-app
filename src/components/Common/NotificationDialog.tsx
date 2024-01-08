import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	DialogActions,
	Button,
} from '@mui/material';

interface NotificationDialogProps {
	open: boolean;
	onClose: () => void;
	message: string | null;
	title?: string;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
	open,
	onClose,
	message,
	title = 'Success',
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography variant='body1'>{message}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NotificationDialog;
