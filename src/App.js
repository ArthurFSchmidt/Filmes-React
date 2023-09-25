import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movie";
import Search from "./pages/search";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/:id" exact element={<Movie />} />
                <Route path="/search/:name" exact element={<Search />} />
                <Route path="/search/" exact element={<Navigate to='/' />} />
            </Routes>
        </div>
    );
};

export default App;
