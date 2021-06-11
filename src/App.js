import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/HeaderContainer/Header";
import Body from "./components/MainContainer/Body";
import Footer from "./components/FooterContainer/Footer";
import SignUpMenu from "./components/Registration/SignUpMenu";
import SignInMenu from "./components/Authorization/SignInMenu";
import Report from "./components/Report/Report";
import ReportList from "./components/ReportList/ReportList";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/signup">
            <SignUpMenu />
          </Route>
          <Route path="/login" component={SignInMenu} />
          <Route path="/" exact component={Body} />
          <Route path="/report" component={Report} exact={true} />
          <Route
            path="/report-list"
            component={ReportList}
            exact={true}
          />
          <Route path="*" render={() => <Body />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
