import React, { useEffect, useState } from 'react';
import { Container, Typography, List } from '@mui/material';
import { getAllPosts } from '../../services/api';
import SinglePost from './SinglePost';
import Loading from '../Common/Loading';

interface Post {
	id: number;
	title: string;
}

const Posts: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const data = await getAllPosts();
			setPosts(data);
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Container maxWidth='md'>
			<Typography variant='h4' gutterBottom>
				Posts List
			</Typography>
			{loading ? (
				<Loading />
			) : (
				<>
					<List>
						{posts.map((post) => (
							<SinglePost key={post.id} post={post} />
						))}
					</List>
				</>
			)}
		</Container>
	);
};

export default Posts;
