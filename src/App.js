import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import News from "./News";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <LoadingBar
            color="#0d6efd"
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="home"
                  category="general"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/about"
              element={
                <News
                  setProgress={this.setProgress}
                  key="about"
                  category="about"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  category="business"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  category="entertainment"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  category="general"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  category="health"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  category="science"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  category="sports"
                  apiKey={this.apiKey}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  category="technology"
                  apiKey={this.apiKey}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
