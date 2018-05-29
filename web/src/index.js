import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import App from "./Components/App";
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import {MyDocuments,Templates, Template} from './Routes';
const hist = createBrowserHistory();


const myColor = '#424242';
const myFont = 'Roboto';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: blue[300],
        main: '#ffffff',
        dark: blue[700],
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
    typography:{

        display4: {
            fontFamily:myFont,
            color: myColor,
        },    
        display3:{
            color: myColor,
            fontFamily:myFont,
        },    
        display2:{
            color: myColor,
            fontFamily:myFont,
        },     
        display1: {
            color: myColor,
            fontFamily:myFont,
        },
        headline:{
            color: myColor,
            fontFamily:myFont,
        },
        title: {
            color: '#880E4F',
            fontFamily:myFont,
        },
        subheading: {
            color: myColor,
            fontFamily:myFont,
        },
        body2:{
            color: myColor,
            fontFamily:myFont,
        },
        body1: {
            color: myColor,
            fontFamily:myFont,
        },
        caption: {
            color: myColor,
            fontFamily:myFont,
        },
        button: {
            color: myColor,
            fontFamily:myFont,
        },
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router history={hist}>
            <Switch>
                <Route exact path="/" component={Templates}/>
                <Route exact path="/documents" component={MyDocuments}/>
                <Route exact path="/templates/:id" component={Template}/>
            </Switch>
        </Router>
    </MuiThemeProvider>,
  document.getElementById("root")
);
