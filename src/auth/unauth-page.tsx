import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDocumentTitle } from "utils";
import { Login } from "./login";
import { Register } from "./register";
import { Card, Divider, Button } from "antd";
export default function UnauthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useDocumentTitle("请登录注册以继续");

    return (
        <Container>
            <Header />
            <ShadowCard>
                <Title>{isRegister ? "请注册" : "请登录"}</Title>
                {isRegister ? (
                    <Register onError={setError} />
                ) : (
                    <Login onError={setError} />
                )}
                <Divider />
                <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已有账号？直接登录" : "注册新账号"}
                </Button>
            </ShadowCard>
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

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
`;

const Title = styled.h2`
    margin-bottom: 2rem;
`;
