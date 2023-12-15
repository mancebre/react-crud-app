const apiUrl = 'https://jsonplaceholder.typicode.com';

export const getAllPosts = async () => {
	const response = await fetch(`${apiUrl}/posts`);
	const data = await response.json();
	return data;
};

export const getPostDetails = async (id: number) => {
	const response = await fetch(`${apiUrl}/posts/${id}`);
	const data = await response.json();
	return data;
};

export const createNewPost = async (itemData: { title: string; body: string }) => {
	const response = await fetch(`${apiUrl}/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(itemData),
	});

	const data = await response.json();
	return data;
};

export const updatePost = async (id: number, itemData: { title: string; body: string }) => {
	const response = await fetch(`${apiUrl}/posts/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(itemData),
	});

	const data = await response.json();
	return data;
};

export const deletePost = async (id: number) => {
	const response = await fetch(`${apiUrl}/posts/${id}`, {
		method: 'DELETE',
	});

	const data = await response.json();
	return data;
};
