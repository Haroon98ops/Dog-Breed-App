import { BrowserRouter, Switch, Route } from "react-router-dom";
import Wlc from "./Components/Wlc";
import "./App.css";
import Fav from "./Components/Fav";
import Newpage from "./Components/Newpage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"  component={Wlc} />
          <Route exact path="/Home" component={Newpage} />
          <Route exact path="/Favourite" component={Fav} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );  
}

export default App;
