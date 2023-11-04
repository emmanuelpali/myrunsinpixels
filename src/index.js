import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route,Routes, BrowserRouter as Router} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Provider from './context/milesandpixelsContext';
import AuthProvider, { useAuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import MyRuns from './components/MyRuns';
import SingleRun from './components/SingleRun';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

function AppRoutes() {
  const { currentUser } = useAuthContext()
  return(
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/images/:id" element={<SingleRun />} />
      {currentUser && <Route path="/myruns" element={<MyRuns />} />}
  </Routes>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
          <Layout>
           <AppRoutes />
          </Layout>

        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
