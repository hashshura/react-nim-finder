import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import routes from "utils/routes";

class App extends React.Component {
  state = {
    token: ""
  };

  render() {
    return (
      <Router>
        <div>
          {routes.map(route => (
            <Route
              path={route.path}
              render={props => (
                <route.component
                  {...props}
                  setToken={token => {
                    this.setState({ token: token });
                  }}
                  getToken={() => this.state.token}
                />
              )}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
