import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './Slice/userSlice'

export default configureStore({
  reducer: {
    currentUser:userSlice,
  },
})