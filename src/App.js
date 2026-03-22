import React, { useState,useEffect, use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import News from "./News";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0)
  
    return (
      <Router>
        <div className="App">
          <Navbar />
          <LoadingBar
            color="#0d6efd"
            height={3}
            progress={progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  key="home"
                  category="general"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/about"
              element={
                <News
                  setProgress={setProgress}
                  key="about"
                  category="about"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={setProgress}
                  key="business"
                  category="business"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress}
                  key="entertainment"
                  category="entertainment"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  setProgress={setProgress}
                  key="general"
                  category="general"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={setProgress}
                  key="health"
                  category="health"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={setProgress}
                  key="science"
                  category="science"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={setProgress}
                  key="sports"
                  category="sports"
                  apiKey={apiKey}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={setProgress}
                  key="technology"
                  category="technology"
                  apiKey={apiKey}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  
}

export default App;
