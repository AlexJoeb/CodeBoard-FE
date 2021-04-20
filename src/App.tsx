import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { useDispatch } from "react-redux";
import { generateUsers } from "./Redux/Slices/usersSlice";
import { generatePosts } from "./Redux/Slices/postSlice";
import { generateComments } from "./Redux/Slices/commentSlice";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App: FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(generateUsers());
    dispatch(generatePosts());
    dispatch(generateComments());
  }, [dispatch]);

  return (
    <Router>
      {/* Wrapper */}
      <div className="w-full min-h-screen px-6 pb-96 bg-background">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
