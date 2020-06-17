import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Login from '../views/Login'
import Home from '../views/Home'
import Todo from '../views/Todo'

const routes = [
    {
        path: "/",
        exact: true,
        component: Login,
        canAccess: true
    },
    {
        path: "/home",
        exact: true,
        component: Home,
        canAccess: true
    },
    {
        path: "/todo",
        exact: true,
        component: Todo,
        canAccess: true
    }
]

export default () => (
    <Fragment>
        {routes.map((route, i) => route.canAccess && <Route key={i} {...route} />)}
    </Fragment>
)