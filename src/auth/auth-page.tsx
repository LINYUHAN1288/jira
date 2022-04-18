import { Button, Dropdown } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { Route, Routes } from "react-router";
import styled from "@emotion/styled";
import React from "react";

export default function AuthPage() {
    return (
        <Container>
            <PageHeader />
            <Main></Main>
        </Container>
    );
}

const PageHeader = () => {
    return (
        <Header>
            <HeaderLeft></HeaderLeft>
            <HeaderRight></HeaderRight>
        </Header>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;

const Header = styled(Row)`
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
    display: flex;
    overflow: hidden;
`;
