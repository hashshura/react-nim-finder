import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import routes from "utils/routes";
import { K_LOCAL_STORAGE_TOKEN_ID } from "utils/constants";

class App extends React.Component {
  state = {
    token: localStorage.getItem(K_LOCAL_STORAGE_TOKEN_ID)
  };

  getToken() {
    const { token } = this.state;
    return token ? token : "";
  }

  setToken(token) {
    this.setState({ token: token });
    localStorage.setItem(K_LOCAL_STORAGE_TOKEN_ID, token);
  }

  render() {
    return (
      <Router>
        <div>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={props => (
                <route.component
                  key={i}
                  {...route.props}
                  setToken={token => {
                    this.setToken(token);
                  }}
                  getToken={() => this.getToken()}
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
