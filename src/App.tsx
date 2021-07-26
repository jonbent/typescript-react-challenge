import './App.css';

import ProductPage from "./components/ProductPage";
import NavBar from './components/NavBar';
import Cart from './components/Cart';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {useAppSelector} from "./util/hooks";
import {useEffect, useState} from "react";

function App() {
    const cartNotEmpty: boolean = useAppSelector(state => Object.keys(state.ui.cart).length > 0)
    const [cartEnabled, setCartEnabled] = useState<boolean>(false);
    useEffect(() => {
        setCartEnabled(cartNotEmpty)
    }, [cartNotEmpty]);

  return (
      <Router>
          <div className="App">
              <div className="main-content">
                  <NavBar
                      cartButtonEnabled={!cartEnabled && cartNotEmpty}
                      openCart={() => setCartEnabled(true)}
                  />
                  <div className="content">
                      <Switch>
                          <Route path="/missingPage">
                              <div className="missing-page">
                                  <h1>Sorry this content is missing!</h1>
                                  <p>
                                      Hello, this content is not available, due to it not being a part of this challenge!<br/>
                                      It's been a lot of fun working with this, and I got so absorbed in the process, time flew by so quickly.<br/>
                                      I was able to learn a bit more about TypeScript through this process than I was already acquainted with, and I feel that to be extremely valuable.<br/>
                                      Anyways it was a pleasure, thanks for checking out my submission!<br/>
                                  </p>

                              </div>
                          </Route>
                          <Route path="/">
                              <ProductPage />
                          </Route>
                      </Switch>
                  </div>
              </div>
              <div className={`cart${cartEnabled ? ' enabled' : ''}`}>
                  <Cart
                      closeCart={() => setCartEnabled(false)}
                  />
              </div>
          </div>
      </Router>
  );
}

export default App;
