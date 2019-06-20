import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={() => (
                <route.component
                  key={i}
                  setToken={token => {
                    this.setToken(token);
                  }}
                  getToken={() => this.getToken()}
                />
              )}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
