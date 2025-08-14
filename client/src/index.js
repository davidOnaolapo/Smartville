import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";

import Application from "./components/Application";

const root = createRoot(document.getElementById("root"));
root.render(<Application />);
