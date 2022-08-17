/**
 * @file lib.tsx 组件封装
 * @author linyuhan
 */

import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import React from "react";

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
        props.between ? "space-between" : undefined};
    margin-bottom: ${(props) => props.marginBottom + "rem"};
`;

const FullPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const FullPageLoading = () => (
    <FullPage>
        <Spin size={"large"} />
    </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <FullPage>
        <ErrorBox error={error} />
    </FullPage>
);

// 类型守卫 or 类型保护
export const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={"danger"}></Typography.Text>;
    }
    return null;
};

export const ButtonNoPadding = styled(Button)`
    padding: 0;
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3.2rem;
    width: 100%;
`;
