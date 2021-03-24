import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";

const App: FC = () => {
  return (
    <Router>
      {/* Wrapper */}
      <div className="w-full min-h-screen px-6 pb-96 bg-background">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
