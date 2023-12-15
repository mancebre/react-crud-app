import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewPost, getPostDetails, updatePost as updatePostAPI, deletePost as deletePostAPI } from '../services/api';

interface UsePostDetailsOptions {
    id?: number;
}

interface Post {
    id: number;
    title: string;
    body: string;
}

interface UsePostDetailsResult {
    post: Post | null;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
    dialogMessage: string | null;
    createPost: (newPost: Post) => Promise<void>;
    updatePost: (updatedPost: Post) => Promise<void>;
    deletePost: () => Promise<void>;
    handleCloseSuccessMessage: () => void;
}

const usePostDetails = ({ id }: UsePostDetailsOptions): UsePostDetailsResult => {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [dialogMessage, setDialogMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async (postId: number) => {
            try {
                setLoading(true);
                const data = await getPostDetails(postId);
                setPost(data);
            } catch (error) {
                handlePostError('fetching', error);
            } finally {
                setLoading(false);
            }
        };

        if (id !== undefined) {
            if (/^\d+$/.test(String(id))) {
                const postId = parseInt(String(id), 10);
                fetchPost(postId);
            } else {
                setError('Invalid post ID');
            }
        }
    }, [id]);

    const handlePostError = (action: string, error: any) => {
        console.error(`Error ${action} post:`, error);
        setError(`Error ${action} post`);
    };    

    const createPost = async (newPost: Post) => {
        try {
            setLoading(true);
            await createNewPost(newPost);
            setDialogMessage('Post created successfully! You will be redirected to the Home page shortly.');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            handlePostError('creating', error);
            setPost(newPost);
        } finally {
            setLoading(false);
        }
    };

    const updatePost = async (updatedPost: Post) => {
        if (id) {
            try {
                setLoading(true);
                const data = await updatePostAPI(id, updatedPost);
                setPost(data);
                setSuccessMessage('Post updated successfully!');
            } catch (error) {
                handlePostError('updating', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const deletePost = async () => {
        if (id) {
            try {
                setLoading(true);
                await deletePostAPI(id);
                setDialogMessage('Post deleted successfully! You will be redirected to the Home page shortly.');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                handlePostError('deleting', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessage(null);
    };

    return {
        post,
        loading,
        error,
        successMessage,
        dialogMessage,
        createPost,
        updatePost,
        deletePost,
        handleCloseSuccessMessage,
    };
};

export default usePostDetails;
