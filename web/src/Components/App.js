import React,{Component, Fragment} from 'react'
import {Header,Footer} from './Layouts'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MyDocuments from '../routes/MyDocuments/MyDocuments'
import Templates from '../routes/Templates/Templates'
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue["A200"],
      dark: blue[700],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
  },
});

export default class extends Component{

render(/*{<Fragment> <Header/><Footer/></Fragment>}*/){ 
    return(
      <MuiThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Templates}/>
          <Route exact path='/documents' component={MyDocuments}/>
          {/* <Route path="/myDoc" component={MyDocuments}/> */}
        </Fragment>
      </Router>
      </MuiThemeProvider>
    )
  }
}