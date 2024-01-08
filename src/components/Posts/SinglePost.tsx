import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText, Tooltip } from '@mui/material';

interface SinglePostProps {
	post: {
		id: number;
		title: string;
	};
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	return (
		<ListItemButton component={Link} to={`/details/${post.id}`} divider={true}>
			<Tooltip title='More Details'>
				<ListItemText primary={post.title} />
			</Tooltip>
		</ListItemButton>
	);
};

export default SinglePost;
