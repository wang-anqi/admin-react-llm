import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "reset-css";
// 全局样式
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { Provider } from "react-redux";
import {store} from './stores'
import "./api/mock";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
