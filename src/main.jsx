import "antd/dist/reset.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("appMountPoint")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
