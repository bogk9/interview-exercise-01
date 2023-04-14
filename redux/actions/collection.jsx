import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const addItemAction = createAction('collection/addItemAction');
export const likeItemAction = createAction('collection/likeItemAction');
export const removeItemAction = createAction('collection/removeItemAction');
export const editItemTitleAction = createAction('collection/ediItemTitleAction');

export const addItem = (item) => async (dispatch) => {
  if(item)
    dispatch(addItemAction({...item, id: uuidv4()}))
};

export const likeItem = (itemId) => async (dispatch) => {
  if(itemId)
    dispatch(likeItemAction(itemId))
}

export const removeItem = (itemId) => async (dispatch) => {
  if(itemId)
    dispatch(removeItemAction(itemId))
}

export const editItemTitle = (itemId, title) => async (dispatch) => {
    dispatch(editItemTitleAction({itemId, title}))
}