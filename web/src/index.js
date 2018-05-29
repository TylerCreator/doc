import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./Components/App";
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import {MyDocuments,Templates, Template} from './Routes';
const hist = createBrowserHistory();

const theme = createMuiTheme({
    palette: {
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router history={hist}>
            <Switch>
                <Route exact path="/" component={Templates}/>
                <Route exact path="/documents" component={MyDocuments}/>
                <Route path="/templates/:id" component={Template}/>
            </Switch>
        </Router>
    </MuiThemeProvider>,
  document.getElementById("root")
);
