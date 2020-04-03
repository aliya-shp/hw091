import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => (
    <>
        <NavItem>
            <NavLink>Hello, {user.username}!</NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={logout} tag={RouterNavLink} to="/">Log Out</NavLink>
        </NavItem>
    </>
);

export default UserMenu;