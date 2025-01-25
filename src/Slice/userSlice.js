import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : null,
  },
  reducers: {
   UserData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { UserData } = userSlice.actions

export default userSlice.reducer