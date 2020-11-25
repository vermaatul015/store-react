import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import  HomePage  from "./containers/Homepage/Homepage"
import OrderForm from "./containers/order/OrderForm";
import OrderList from "./containers/order/OrderList";
import StoreForm from "./containers/Store/StoreForm";
import StoreList from "./containers/Store/StoreList";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/create-store">
                <StoreForm />
            </Route>
            <Route exact path="/store-list">
                <StoreList />
            </Route>
            <Route exact path="/create-order">
                <OrderForm />
            </Route>
            <Route exact path="/order-list">
                <OrderList />
            </Route>
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    );
    
}

export default Router;