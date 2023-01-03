import React from "react";
import ReactDOM from "react-dom/client";
import "../src/scss/globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./routes/MainPage";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
