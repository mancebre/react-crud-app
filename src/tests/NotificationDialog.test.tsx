import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationDialog from '../components/Common/NotificationDialog';

test('calls onClose when Dialog is closed', async () => {
    const onCloseMock = jest.fn();

    render(
        <NotificationDialog
            open={true}
            onClose={onCloseMock}
            message="Operation successful"
            title="Success"
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

test('renders NotificationDialog with the provided title and message', () => {
    render(
        <NotificationDialog
            open={true}
            onClose={() => {}}
            message="Operation successful"
            title="Custom Title"
        />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
});
