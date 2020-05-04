import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import { TransactionProvider } from 'context/TransactionContext';

const PageTransactionList = Loadable({ loading: () => <Loading text={false}/>, loader: () => import('pages/TransactionList') });
const PageTransactionDetail = Loadable({ loading: () => <Loading text={false}/>, loader: () => import('pages/TransactionDetail') });

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <TransactionProvider>
      <Router>
        <Switch>
          <Route exact={true} path="/" component={PageTransactionList} />
          <Route exact={true} path="/transaction/:id" component={PageTransactionDetail} />
        </Switch>
      </Router>
    </TransactionProvider>
  );
};

export default App;
