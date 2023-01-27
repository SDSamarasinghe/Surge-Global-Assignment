import React from "react";
import { RouterProvider } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigator from "./components/navigator";
import router from "./routes";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navigator />
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
