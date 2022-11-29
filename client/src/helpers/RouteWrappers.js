import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute = ({children, ...rest}) => {
    let user = useSelector((state) => {
        return state.userStore.user
    })
    return (
        <Route
            {...rest}
            render={({location}) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

export const AuthRoute = ({children, ...rest}) => {
    let user = useSelector((state) => {
        return state.userStore.user
    })
    return (
        <Route
            {...rest}
            render={({location}) =>
                !user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/boards",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}