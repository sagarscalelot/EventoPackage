import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  counts: JSON.parse(localStorage.getItem("stepCountNotification")) || 0
}

export const StepProgressNotification  = createSlice({
    name: 'StepProgressNotification',
    initialState,
    reducers: {
        increments: (state) => {
            state.counts +=1
            localStorage.setItem("stepCountNotification",JSON.stringify(state.counts));
            console.log("steps");
        },
        decrements: (state) => {
            if(state.counts > 0) {
                state.counts -=1
                localStorage.setItem("stepCountNotification",JSON.stringify(state.counts))
            }
        },
        setNumber: (state, action) => {
            state.counts = action.payload
            localStorage.setItem("stepCountNotification",JSON.stringify(state.counts))
        },
        reset: (state) => {
            state.counts = 0
            localStorage.setItem("stepCountNotification",JSON.stringify(state.counts))
        }
    },
  })
  
  export const { increments, decrements, setNumber, reset } = StepProgressNotification.actions;
  
  export default StepProgressNotification.reducer