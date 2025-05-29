import { createSlice } from "@reduxjs/toolkit";
import { dummyUsers } from "../../services/dummyUsers";

// Helper to safely get users from localStorage or fallback
const getInitialUsers = () => {
  try {
    const stored = localStorage.getItem("userData");
    if (stored) return JSON.parse(stored);
    // If no data stored, store and return first 4 dummy users
    const initialUsers = dummyUsers.slice(0, 4);
    localStorage.setItem("userData", JSON.stringify(initialUsers));
    return initialUsers;
  } catch (error) {
    console.error("Failed to load users from localStorage:", error);
    return dummyUsers.slice(0, 4);
  }
};

const initialState = {
  userData: getInitialUsers(),
  isModel: false,
  selectedUser:null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleModel: (state) => {
      state.isModel = !state.isModel;
    },
    handlerCloseModel: (state) => {
      state.isModel = false;
      state.selectedUser = null;
    },
    setUsers: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    addUser: (state, action) => {
      state.userData.push(action.payload);
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.isModel = true; 
    },
    updateUser: (state, action) => {
      const index = state.userData.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.userData[index] = action.payload;
        localStorage.setItem("userData", JSON.stringify(state.userData));
      }
    },
    deleteUser: (state, action) => {
      if (!state.userData) return;
      state.userData = state.userData.filter(
        (user) => user.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  toggleModel,
  handlerCloseModel,
  setSelectedUser
} = userSlice.actions;
export default userSlice.reducer;
