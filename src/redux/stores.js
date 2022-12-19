import { configureStore } from '@reduxjs/toolkit';
import StepProgressNotificatinReducer from './stepProgressNotification';
import createNotificationReducer from './createNotification';

export const store = configureStore({
  reducer: {
    createNotification : createNotificationReducer,
    stepProgressNotification: StepProgressNotificatinReducer,
  },
})