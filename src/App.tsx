import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import HomeNavigation from './Components/home/HomeNavigation';
import LinkedinProfile from './Components/linkedinProfile';
import Login from './Components/Login';

const queryClient = new QueryClient();
queryClient.invalidateQueries('profile');
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home/:page" component={HomeNavigation} />
            <Route path="/linkedinProfile/:id" component={LinkedinProfile} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </>
  );
}
