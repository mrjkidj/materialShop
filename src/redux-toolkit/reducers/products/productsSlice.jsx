import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, remove } from '../../../api/api';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  console.log('Запрос отправляется на /api/products');
  return get('/api/products');
});


export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  return get(`/api/products/${id}`);
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
  console.log('Запрос отправляется на POST /api/products');
  return post('/api/products', productData);
});


export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  return put(`/api/products/${id}`, productData);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  return remove(`/api/products/delete/${id}`); 
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.items = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed'; 
      })

      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state) => {
        state.status = 'succeeded';
        
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
      
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
     
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
