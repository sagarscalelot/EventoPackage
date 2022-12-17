import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectbusiness: JSON.parse(localStorage.getItem("category")) || null,
  user: null,
  publishDataTime : null,
  NotificationMode: null,
  payment: null
}

export const createNotification  = createSlice({
    name: 'createNotification',
    initialState,
    reducers: {
        addSelectbusiness: (state, action) => {
            state.selectbusiness = action.payload.selectbusiness
            localStorage.setItem("selectbusiness",JSON.stringify(state.selectbusiness));
        },
        addUser: (state, action) => {
          state.user = action.payload.user
        },
        addPublishDataTime: (state, action) => {
          state.publishDataTime = action.payload.publishDataTime
        },
        addNotificationMode: (state, action) => {
          state.NotificationMode = action.payload.NotificationMode
        },
        addPayment: (state, action) => {
          state.companyDetail = action.payload.companyDetail
        },
        addTermsAndCondition: (state, action) => {
          state.termsAndCondition = action.payload.termsAndCondition
        },
        removeData: (state, action) => {
          state[action.payload] = null
        }
    },
  })
  
  export const { addSelectbusiness, addUser, addPublishDataTime, addNotificationMode, addPayment } = createNotification.actions
  
  export default createNotification.reducer