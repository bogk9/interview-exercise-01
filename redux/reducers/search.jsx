import { createReducer } from '@reduxjs/toolkit';
import {
    fetchImagesRequest,
    fetchImagesSuccess,
    fetchImagesFailure,
  } from '../actions/search';

const initialState = {
    query: '',
    results: [],
    loading: false,
    error: null
  };
  
export const searchReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(fetchImagesRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImagesSuccess, (state, action) => {
        if(action.payload.length === 0)
          state.error = "No results found";
        else
          state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchImagesFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  });