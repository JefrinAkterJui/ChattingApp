import { createSlice } from '@reduxjs/toolkit'

export const MessgSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('ChatUser')) ? JSON.parse(localStorage.getItem('ChatUser')) : null,
  },
  reducers: {
   chatData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { chatData } = MessgSlice.actions

export default MessgSlice.reducer