import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import Header from '../components/Headers/Header';
import Companies from '../views/Companies';
import InvestorDetails from '../views/InvestorDetails';
import Investors from '../views/Investors';

const Admin = () => {
  return (
    <div className='container'>
      <Header />
      <div className='ui secondary pointing menu'>
        <NavLink className='item' to='/admin/investors'>
          Investors
        </NavLink>
        <NavLink className='item' to='/admin/companies'>
          Companies
        </NavLink>
      </div>
      <Switch>
        <Route path='/admin/investors/:id' exact component={InvestorDetails} />
        <Route path='/admin/investors' exact component={Investors} />
        <Route path='/admin/companies' exact component={Companies} />
        <Redirect from='/admin' to='/admin/investors' />
      </Switch>
    </div>
  );
};

export default Admin;
