import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, remove } from '../../../api/api';


export const fetchReviewsByProductId = createAsyncThunk(
  'reviews/fetchReviewsByProductId',
  async (productId) => {
    const response = await get(`/api/product/reviews/${productId}`);
    console.log('API Response (fetchReviews):', response);
    return Array.isArray(response.reviews) ? response.reviews : []; 
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ productId, reviewData }, { getState, rejectWithValue }) => {
    const state = getState();
    const items = Array.isArray(state.reviews.items) ? state.reviews.items : []; 
    const existingNames = items.map((review) => review.userName.toLowerCase());
    const userNameLower = reviewData.userName.toLowerCase();

    if (existingNames.includes(userNameLower)) {
      return rejectWithValue('Имя пользователя уже существует. Пожалуйста, выберите другое имя.');
    }

    const response = await post(`/api/product/reviews`, { productId, ...reviewData });
    console.log('API Response (createReview):', response); 
    return response.review;
  }
);


export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }) => {
    const response = await put(`/api/product/reviews/${reviewId}`, reviewData);
    console.log('API Response (updateReview):', response); 
    return response; 
  }
);


export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const response = await remove(`/api/product/reviews/${reviewId}`);
    console.log('API Response (deleteReview):', response); 
    return reviewId; 
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : []; 
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(state.items)) {
          state.items.push(action.payload); 
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Обработка обновления комментария
      .addCase(updateReview.fulfilled, (state, action) => {
        const updatedReview = action.payload;
        if (Array.isArray(state.items)) {
          const index = state.items.findIndex((review) => review._id === updatedReview._id);
          if (index !== -1) {
            state.items[index] = updatedReview; 
          }
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const deletedId = action.payload;
        if (Array.isArray(state.items)) {
          state.items = state.items.filter((review) => review._id !== deletedId); 
        }
      });
  },
});

export default reviewsSlice.reducer;
