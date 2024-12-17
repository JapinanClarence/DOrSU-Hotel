import HomePage from './pages/HomePage'
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
