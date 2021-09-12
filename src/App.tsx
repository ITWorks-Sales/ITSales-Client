import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.global.css';
import HomeNavigation from './Components/home/HomeNavigation';
import LinkedinProfile from './Components/linkedinProfile';
import Login from './Components/Login';
import IPCInitialization from './ipc';
import { RecoilExternalStatePortal } from './RecoilExternalStatePortal';

const queryClient = new QueryClient();
queryClient.invalidateQueries('profile');

// Function.prototype.bodyToString = function (): string {
//   const entire = this.toString();
//   return entire.slice(entire.indexOf('{') + 1, entire.lastIndexOf('}'));
// };

export default function App() {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home/:page" component={HomeNavigation} />
              <Route path="/linkedinProfile/:id" component={LinkedinProfile} />
            </Switch>
          </Router>
        </QueryClientProvider>
        <RecoilExternalStatePortal />
      </RecoilRoot>
    </>
  );
}

IPCInitialization();
