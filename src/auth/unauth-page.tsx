import styled from "@emotion/styled";
import React from "react";
export default function UnauthPage() {
    return (
        <Container>
            <Header />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: pink;
`;

const Header = styled.header`
    width: 100%;
    height: 200px;
    background-color: blue;
`;
