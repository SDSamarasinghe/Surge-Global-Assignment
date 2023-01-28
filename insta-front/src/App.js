import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Navigator from "./components/navigator";
import "./App.css";
import router from "./routes";

const App = () => {
  return (
    <div>
      <Navigator />
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
