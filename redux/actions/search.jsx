import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

const NASA_IMAGE_API_ENDPOINT =
  'https://images-api.nasa.gov/search?q=';

export const fetchImagesRequest = createAction('images/fetchImagesRequest');
export const fetchImagesSuccess = createAction('images/fetchImagesSuccess');
export const fetchImagesFailure = createAction('images/fetchImagesFailure');

export const fetchImages = (searchTerm) => async (dispatch) => {
  const queryTerm = `${searchTerm} planet`;
  dispatch(fetchImagesRequest());
  try {
    const response = await axios.get(`${NASA_IMAGE_API_ENDPOINT}${queryTerm}`);
    const images = response.data.collection.items;
    dispatch(fetchImagesSuccess(images));
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    dispatch(fetchImagesFailure(message));
  }
};
