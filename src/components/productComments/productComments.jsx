import useState from 'react';
import useEffect from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchReviewsByProductId,
    createReview,
    updateReview,
    deleteReview,
} from '../../redux-toolkit/reducers/reviews/reviewsSlice';
import styles from './productComments.module.css';
import PropTypes from 'prop-types';

const ProductComments = ({ productId }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) =>
        state.reviews.items.filter((review) => review.productId === productId)
    ); 
    const reviewsStatus = useSelector((state) => state.reviews.status);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (reviewsStatus === 'idle') {
            dispatch(fetchReviewsByProductId(productId)); 
        }
    }, [dispatch, productId, reviewsStatus]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            dispatch(createReview({ productId, reviewData: { text: newComment } }));
            setNewComment(''); 
        }
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment.id);
        setEditText(comment.text);
    };

    const handleSaveEdit = (reviewId) => {
        dispatch(updateReview({ reviewId, reviewData: { text: editText } }));
        setEditingComment(null);
        setEditText('');
    };

    const handleDeleteComment = (reviewId) => {
        dispatch(deleteReview(reviewId));
    };

    return (
        <div className={styles.commentsContainer}>
            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} className={styles.commentItem}>
                            {editingComment === comment.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        placeholder="Edit comment"
                                    />
                                    <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                    <button onClick={() => setEditingComment(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <p>{comment.text}</p>
                                    <button onClick={() => handleEditComment(comment)}>Edit</button>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Submit</button>
        </div>
    );
};

ProductComments.propTypes = {
    productId: PropTypes.string.isRequired, 
};


export default ProductComments;
