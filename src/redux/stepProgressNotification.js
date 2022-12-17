import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: JSON.parse(localStorage.getItem("stepCount")) || 0
}

export const stepProgressNotification  = createSlice({
    name: 'stepProgressNotification',
    initialState,
    reducers: {
        increment: (state) => {
            state.count +=1
            localStorage.setItem("stepCount",JSON.stringify(state.count))
        },
        decrement: (state) => {
            if(state.count > 0) {
                state.count -=1
                localStorage.setItem("stepCount",JSON.stringify(state.count))
            }
        },
        setNumber: (state, action) => {
            state.count = action.payload
            localStorage.setItem("stepCount",JSON.stringify(state.count))
        },
        reset: (state) => {
            state.count = 0
            localStorage.setItem("stepCount",JSON.stringify(state.count))
        }
    },
  })
  
  export const { increment, decrement, setNumber, reset } = stepProgressNotification.actions;
  
  export default stepProgressNotification.reducer