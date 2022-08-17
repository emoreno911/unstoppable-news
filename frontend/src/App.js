import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from 'web3uikit';
import Article from './pages/article';
import Home from './pages/home';
import Submit from './pages/submit';
import DataContextProvider from './app/context';

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <DataContextProvider>
            <HashRouter>
                <Switch>
                    <Route path="/" exact render={props => <Home {...props} />} />
                    <Route path="/submit" render={props => <Submit {...props} />} />
                    <Route path="/article/:cid?" render={(props) => <Article {...props} />} />
                </Switch>
            </HashRouter>
        </DataContextProvider>
      </NotificationProvider>
    </MoralisProvider>
  );
}

export default App;
