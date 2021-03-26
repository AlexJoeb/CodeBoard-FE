import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { generateUsers } from "./Redux/Slices/userSlice";
import { generatePosts } from "./Redux/Slices/postSlice";
import { generateComments } from "./Redux/Slices/commentSlice";
import { useSelector, connect, useDispatch } from "react-redux";
import { RootState } from "./Redux/store";

const App: FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  React.useEffect(() => {
    dispatch(generateUsers());
    dispatch(generatePosts());
    dispatch(generateComments());
  }, []);

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
// export default connect((state) => state, (dispatch) => ({ dispatch }))(App);
