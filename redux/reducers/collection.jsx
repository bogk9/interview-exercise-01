import { createReducer } from '@reduxjs/toolkit';
import {
    addItemAction, editItemTitleAction, likeItemAction, removeItemAction
  } from '../actions/collection';
import data from '../mock/collection.json';

const initialState = {
  items: data
  };
  
export const collectionReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(addItemAction, (state, action) => {
        state.items = [...state.items, action.payload]
      })
      .addCase(likeItemAction, (state, action) => {
        state.items = state.items.map(item => {
          if(item.id === action.payload){
            return {
              ...item,
              isLiked: !item.isLiked
            }
          }
          return item
        })
      }
      )
      .addCase(removeItemAction, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      }
      )
      .addCase(editItemTitleAction, (state, action) => {
        state.items = state.items.map(item => {
          if(item.id === action.payload.itemId){
            return {
              ...item,
              title: action.payload.title
            }
          }
          return item
        })
      }
      )
  });