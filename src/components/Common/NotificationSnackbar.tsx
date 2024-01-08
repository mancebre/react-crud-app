import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface NotificationSnackbarProps {
	open: boolean;
	onClose: () => void;
	message: string | null;
	success: boolean;
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
	open,
	onClose,
	message,
	success,
}) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={3000}
			onClose={onClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<Alert onClose={onClose} severity={success ? 'success' : 'error'}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default NotificationSnackbar;
