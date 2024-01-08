import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

test('renders Home component', () => {
	render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>,
	);

	expect(screen.getByText('Home Page')).toBeInTheDocument();

	const createButton = screen.getByRole('link', { name: /create/i });
	expect(createButton).toBeInTheDocument();
	expect(createButton).toHaveAttribute('href', '/create');
	expect(screen.getByTestId('posts-component')).toBeInTheDocument();
});
