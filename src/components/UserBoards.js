import '../styles/UserBoards.scss'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card as CardWrapper, CardBody, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import {useHistory} from "react-router-dom";
import gradient from 'random-gradient';
import {BoardEditor} from "./BoardEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {postAcceptInvite, postDeclineInvite} from "../store/actions/InviteActions";

export const UserBoards = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userStore.user.id);
    const boards = useSelector((state) => {
        return state.boardStore.boards
    });
    const invites = useSelector(state => state.inviteStore.invites)
    const history = useHistory();

    const [addBoard, setAddBoard] = useState(false);
    const [editingBoardId, setEditingBoardId] = useState(null);

    const goToBoard = (id) => {
        history.push(`/boards/${id}`)
    }

    const handleAddBoard = () => {
        setAddBoard(true)
    }

    const handleCancelAddBoard = () => {
        setAddBoard(false)
    }

    const handleEditBoard = (boardId) => {
        setEditingBoardId(boardId)
    }

    const handleCancelEditBoard = () => {
        setEditingBoardId(null)
    }

    const handleAcceptInvite = (boardId, inviteId) => {
        dispatch(postAcceptInvite(userId, boardId, inviteId))
    }

    const handleDeclineInvite = (inviteId) => {
        dispatch(postDeclineInvite(inviteId))
    }

    return (
        <div className="userboards">
            <Container>
                <h2 className="userboards-header">My boards</h2>
                <Row xs="4">
                    {boards.map((board, index) => (
                        <Col key={index}>
                            <CardWrapper className="userboards-boardcard" key={index}
                                       style={{background: gradient(board.name)}}>
                                {editingBoardId === board._id ? (
                                    <BoardEditor boardId={board._id} saveLabel="Save" handleCancel={handleCancelEditBoard}
                                                 currentName={board.name}/>) : (
                                    <CardBody className="userboards-boardcard__body">
                                        <div className="userboards-boardcard__icon"
                                             onClick={() => handleEditBoard(board._id)}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </div>
                                        <CardTitle className="userboards-boardcard__title"
                                                   tag="h5"
                                                   onClick={() => goToBoard(board._id)}>{board.name}</CardTitle>
                                    </CardBody>
                                )}
                            </CardWrapper>
                        </Col>
                    ))}
                    <Col>
                        {addBoard ? (<BoardEditor saveLabel="Save" handleCancel={handleCancelAddBoard}/>) : (
                            <Button className="userboards-button" color="success" onClick={handleAddBoard}>New
                                board</Button>)}
                    </Col>
                </Row>
                <hr className="userboards-divider"/>
                <h2 className="userboards-header">My invites</h2>
                <Row xs="4">
                    {invites.map((invite, index) => (
                        <Col key={index}>
                            <CardWrapper className="userboards-invite" style={{background: gradient(invite._id)}}>
                                <CardBody>
                                    <CardTitle>Invite to {invite.boardTo.name} from {invite.userFromLogin}</CardTitle>
                                    <CardText>
                                        <Button className="userboards-button" color="success" onClick={() => handleAcceptInvite(invite.boardTo.id, invite._id)}>Accept</Button>
                                        <Button className="userboards-button" color="danger" onClick={() => handleDeclineInvite(invite._id)}>Decline</Button>
                                    </CardText>
                                </CardBody>
                            </CardWrapper>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}