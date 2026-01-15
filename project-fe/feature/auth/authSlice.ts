// import { User } from "@/model/user.model";
import { IUser } from "@/model/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  loading: boolean;
  user: IUser | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuthentication: (state) => {
      state.isAuthenticated = true;
    },
    // setUserToken:(state, action: PayloadAction<any>)=>{
    // },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logout, setUser, setAuthentication } = authSlice.actions;
export default authSlice.reducer;
