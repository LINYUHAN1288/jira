import { Button, Dropdown, Menu } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { useAuth } from "context/auth-context";
import { Route, Routes } from "react-router";
import styled from "@emotion/styled";
import React from "react";

export default function AuthPage() {
    return (
        <Container>
            <PageHeader />
            <Main>
                <Routes>
                    <Route />
                </Routes>
            </Main>
        </Container>
    );
}

const PageHeader = () => {
    return (
        <Header>
            <HeaderLeft>
                <ButtonNoPadding type={"link"}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
                </ButtonNoPadding>
            </HeaderLeft>
            <HeaderRight></HeaderRight>
        </Header>
    );
};

const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}></Menu.Item>
                </Menu>
            }
        >
            <Button></Button>
        </Dropdown>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
    display: flex;
    background: pink;
    overflow: hidden;
`;
