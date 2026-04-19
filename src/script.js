import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./mainLayout";
import ReachUs from "./Pages/ReachUs";

function App(){

    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="about" element={<About></About>}></Route>
                <Route path="reach-us" element={<ReachUs></ReachUs>}></Route>
                <Route path="our-products" element={<ReachUs></ReachUs>}></Route>
                <Route path="our-clients" element={<ReachUs></ReachUs>}></Route>
                <Route path="our-locations" element={<ReachUs></ReachUs>}></Route>
            </Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
