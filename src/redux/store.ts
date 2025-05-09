import {
  combineReducers,
  configureStore,
  type Middleware,
} from "@reduxjs/toolkit";
import { authService } from "./api/auth";
import { userService } from "./api/userService";

const rootReducer = combineReducers({
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
});

const apiMiddleware: Middleware[] = [
  authService.middleware,
  userService.middleware,
];

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
