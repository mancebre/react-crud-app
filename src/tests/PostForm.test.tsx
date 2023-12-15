import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PostForm from '../components/Posts/PostForm';

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();

interface Post {
	id: number;
	title: string;
	body: string;
}

const mockPost = {
	id: 1,
	title: 'Test Title',
	body: 'Test Body Content',
};

const renderPostForm = (post: Post | null) => {
	return render(
		<PostForm post={post} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
	);
};

describe('PostForm', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders form correctly for creating a new post', () => {
		renderPostForm(null);

		expect(screen.getByText('Create Post')).toBeInTheDocument();
		expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Body/i)).toBeInTheDocument();
		expect(screen.getByText('Create')).toBeInTheDocument();
	});

	it('renders form correctly for editing an existing post', () => {
		renderPostForm(mockPost);

		expect(screen.getByText('Edit Post')).toBeInTheDocument();
		expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Body/i)).toBeInTheDocument();
		expect(screen.getByText('Update')).toBeInTheDocument();
	});

	it('calls onUpdate when the form is submitted', async () => {
		renderPostForm(null);

		fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
		fireEvent.change(screen.getByLabelText(/Body/i), { target: { value: 'Test Body Content' } });

		act(() => {
			userEvent.click(screen.getByText('Create'));
		});

		await waitFor(() => {
		expect(mockOnUpdate).toHaveBeenCalledWith({
			id: 0,
			title: 'Test Title',
			body: 'Test Body Content',
		});
		});
	});

	it('calls onDelete when the delete button is clicked', async () => {
		renderPostForm(mockPost);

		act(() => {
			userEvent.click(screen.getByText('Delete'));
		});

		await waitFor(() => {
			const confirmDeleteButton = screen.getByText('Yes');
			expect(confirmDeleteButton).toBeInTheDocument();
		});

		act(() => {
			userEvent.click(screen.getByText('Yes'));
		});
		await waitFor(() => {
			expect(mockOnDelete).toHaveBeenCalledWith(1);
		});
	});
});
