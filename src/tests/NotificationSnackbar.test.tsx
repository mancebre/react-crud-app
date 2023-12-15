import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationSnackbar from '../components/Common/NotificationSnackbar';

test('renders NotificationSnackbar component with success message', () => {
    render(
        <NotificationSnackbar
            open={true}
            onClose={() => {}}
            message="Operation successful"
            success={true}
        />
    );

    expect(screen.getByText('Operation successful')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
});

test('renders NotificationSnackbar component with error message', () => {
    render(
        <NotificationSnackbar
            open={true}
            onClose={() => {}}
            message="Operation failed"
            success={false}
        />
    );

    expect(screen.getByText('Operation failed')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toBeInTheDocument();

    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
});

test('calls onClose when Snackbar is closed', async () => {
    const onCloseMock = jest.fn();

    render(
        <NotificationSnackbar
            open={true}
            onClose={onCloseMock}
            message="Operation successful"
            success={true}
        />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    act(() => {
        userEvent.click(closeButton);
    });

    await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalled();
    });
});
