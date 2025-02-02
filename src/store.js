import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './Slice/userSlice'
import  MessgSlice  from './Slice/MessgSlice'

export default configureStore({
  reducer: {
    currentUser:userSlice,
    ChatUser:MessgSlice
  },
})