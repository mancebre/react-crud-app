import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Create from '../pages/Create';

jest.mock('../hooks/usePostDetails', () => ({
    __esModule: true,
    default: () => ({
        post: null,
        loading: true,
        error: null,
        successMessage: null,
        dialogMessage: null,
        createPost: jest.fn(),
        handleCloseSuccessMessage: jest.fn(),
    }),
}));

jest.mock('../components/Common/NotificationSnackbar', () => {
    return jest.fn(() => null);
});

jest.mock('../components/Common/NotificationDialog', () => {
    return jest.fn(() => null);
});

test('renders Create component with loading state', async () => {
    render(<Create />);

    await waitFor(() => {
        expect(screen.getByText('Create Page')).toBeInTheDocument();
    });

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();

    expect(screen.queryByLabelText('Title')).toBeNull();
});

test('renders Create component without loading state', async () => {
    jest.spyOn(require('../hooks/usePostDetails'), 'default').mockReturnValueOnce({
        post: null,
        loading: false,
        error: null,
        successMessage: null,
        dialogMessage: null,
        createPost: jest.fn(),
        handleCloseSuccessMessage: jest.fn(),
    });

    render(<Create />);

    await waitFor(() => {
        expect(screen.getByText('Create Page')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading-component')).toBeNull();

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
});
