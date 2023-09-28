import { createSlice } from "@reduxjs/toolkit"
const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsArray: []
    },
    reducers: {
        addComments: (state, action) => {
            console.log('action', action)
            if (typeof (action.payload) === "object") {
                state.commentsArray.push(action.payload)
            }else{
                state.commentsArray.nestedComments.push(action.payload)
            }
        },
        // removeComments: (state, action) => {
        //     console.log('inside rwmove comments')
        //     let index = action.payload
        //     console.log('index in paload',index ,action)
        //     state.commentsArray.filter((item, index) => state.commentsArray.indexOf(item) === index)
        // }
        removeComments: (state, action) => {
            state.commentsArray.splice(action.payload, 1);
        }

    }
})
export const { addComments, removeComments } = commentSlice.actions
export default commentSlice.reducer