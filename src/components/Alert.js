import React from "react";
import {useSelector} from "react-redux";
import {Col, Container, Row} from "reactstrap";

export const Alert = () => {
    const alert = useSelector(state => state.alertStore.alertMessage);

    if(alert) {
        return (
            <Container className="alert" style={{background: "white"}}>
                <Row>
                    <Col>{alert}</Col>
                </Row>
            </Container>
        )
    } else {
        return null
    }
}