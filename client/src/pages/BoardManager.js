import React, {useEffect, useState} from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    UncontrolledDropdown
} from "reactstrap";
import axios from "axios";
import {apiUrl} from "../config";
import authHeader from "../helpers/AuthHeader";
import {useDebounce} from "../helpers/DebounceHook";
import {useDispatch, useSelector} from "react-redux";
import {postInviteUser} from "../store/actions/InviteActions";
import {postChangePermission} from "../store/actions/UserActions";

export const BoardManager = ({boardId, boardName, permissionsArray, currentUserPermissions, getPermissionsArray}) => {
    const user = useSelector(state => state.userStore.user);
    const hasAdminRights = useSelector(state => {
        if (state.boardStore.activeBoard) {
            return state.boardStore.activeBoard.admins.includes(user.id) || state.boardStore.activeBoard.creator === user.id
        }
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchUsersResult, setSearchResult] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const dispatch = useDispatch();

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const preventDropdownClose = (event) => {
        event.stopPropagation()
    }

    const queryUsersByName = (searchTerm) => axios.get(apiUrl + '/users/queryByName', {
        headers: authHeader(),
        params: {
            searchTerm: searchTerm
        },
    });

    const handleInviteUser = (userToId) => {
        const newInvite = {
            userFromLogin: user.login,
            userToId: userToId,
            boardTo: {
                id: boardId,
                name: boardName
            }
        };
        dispatch(postInviteUser(newInvite))
    }

    const handleChangePermission = (userToId, boardId, permissionName, permissionValue) => {
        dispatch(postChangePermission(userToId, boardId, permissionName, permissionValue))
        getPermissionsArray();
    }

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setSearching(true);
                queryUsersByName(debouncedSearchTerm).then((res) => {
                    setSearching(false);
                    setSearchResult(res.data.users);
                });
            } else {
                setSearchResult([]);
                setSearching(false);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    return (
        <div className="board-manager">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} disabled={currentUserPermissions.canInvite} className="board-manager__invites">
                <DropdownToggle className="board-manager__button" color="primary">
                    Invite people
                </DropdownToggle>
                <DropdownMenu container="body">
                    <Form className="board-manager__invites-form">
                        <Input onClick={preventDropdownClose}
                               onChange={event => setSearchTerm(event.target.value)}/>
                    {isSearching && <DropdownItem>Searching ...</DropdownItem>}
                        {searchUsersResult.map((user, index) => (
                            <Label key={index}>{user.login}
                                <Button className="board-manager__button" style={{margin: '10px'}}
                                        onClick={() => handleInviteUser(user._id)}>Invite</Button>
                            </Label>

                        ))
                        }
                    </Form>
                </DropdownMenu>
            </Dropdown>
            <UncontrolledDropdown className="board-manager__permissions" disabled={hasAdminRights}>
                <DropdownToggle className="board-manager__button">
                    Change permissions
                </DropdownToggle>
                <DropdownMenu style={{width: '17rem'}}>
                    <Form className="board-manager__permissions-form">
                        {permissionsArray.map((item, index) => (
                            <Label className="board-manager__permissions-form-row">
                                {item.login}: {item.permissions ? (Object.keys(item.permissions[`${boardId}`]).map(key => (
                                <FormGroup
                                    className="board-manager__permissions-form-row__group"><Label>{key}</Label><Input
                                    type="checkbox"
                                    defaultChecked={item.permissions[`${boardId}`][`${key}`]}
                                    onChange={() => handleChangePermission(item._id, boardId, key, !item.permissions[`${boardId}`][`${key}`])}/></FormGroup>))) : null}
                            </Label>
                        ))}
                    </Form>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}