import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./mainLayout";

function App(){

    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="about" element={<About></About>}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
