import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux-toolkit/reducers/products/productsSlice';
import usersReducer from './reducers/usersSlice/usersSlice'
import reviewsReducer from './reducers/reviews/reviewsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        reviews: reviewsReducer,
    },
});

export default store;


