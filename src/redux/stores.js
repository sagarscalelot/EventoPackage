import { configureStore } from '@reduxjs/toolkit';
import StepProgressNotificationReducer from './stepProgressNotification';
import createNotificationReducer from './createNotification';

export const store = configureStore({
  reducer: {
    createNotification : createNotificationReducer,
    stepProgressNotification: StepProgressNotificationReducer,
  },
})