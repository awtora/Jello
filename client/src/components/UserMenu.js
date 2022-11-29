import React from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faColumns, faDoorOpen, faUser} from "@fortawesome/free-solid-svg-icons";
import {postLogOut} from "../store/actions/UserActions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

export const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(postLogOut())
    }

    return (
        <UncontrolledDropdown className="app-header__profile-menu rounded-circle">
            <DropdownToggle>
                <FontAwesomeIcon icon={faUser}/>
            </DropdownToggle>
            <DropdownMenu container="body">
                <DropdownItem header>{user.login}</DropdownItem>
                <DropdownItem onClick={() => history.push('/profile')}><FontAwesomeIcon icon={faCog}/> Edit profile</DropdownItem>
                <DropdownItem onClick={() => history.push('/boards')}><FontAwesomeIcon icon={faColumns}/> My boards</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={handleLogout}><FontAwesomeIcon
                    icon={faDoorOpen}/> Logout</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}