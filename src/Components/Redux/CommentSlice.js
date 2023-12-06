import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    idCounter: 1,
    commentsArray: []
  },
  reducers: {
    addComments: (state, action) => {
        const { parentId } = action.payload;
      
        if (parentId) {
          const addReplyToComment = (comments) => {
            for (let i = 0; i < comments.length; i++) {
              if (comments[i].id === parentId) {
                comments[i].nestedComments.push(action.payload);
                return;
              }
              if (comments[i].nestedComments.length > 0) {
                addReplyToComment(comments[i].nestedComments);
              }
            }
          }
      
          addReplyToComment(state.commentsArray);
        } else {
          action.payload.nestedComments = [];
          state.commentsArray.push(action.payload);
        }
      
        state.idCounter += 1;
      },
    removeComments: (state, action) => {
      state.commentsArray = state.commentsArray.filter(comment => {
        if (comment.id === action.payload) {
          return false;
        } else {
          // Recursively filter out the comments with the specified id
          const filterNested = (comments) => comments.filter(c => {
            if (c.id === action.payload) return false;
            if (c.nestedComments.length > 0) c.nestedComments = filterNested(c.nestedComments);
            return true;
          });

          comment.nestedComments = filterNested(comment.nestedComments);
          return true;
        }
      });
    }
  }
});

export const { addComments, removeComments } = commentSlice.actions;
export default commentSlice.reducer;
