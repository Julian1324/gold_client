import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleGoHome = () => navigate('/');

    return (
        <Container className="text-center" style={{ marginTop: "10%", minHeight: "70vh" }}>
            <Row>
                <Col>
                    <h1 className="display-3 text-danger">404</h1>
                    <h2 className="mb-4">Página no encontrada</h2>
                    <p className="mb-4">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                    <Button variant="primary" onClick={handleGoHome}>
                        Volver al Inicio
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;