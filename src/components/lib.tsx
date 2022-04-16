import styled from "@emotion/styled";
import { Spin, Typography } from "antd";

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

export const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={"danger"}></Typography.Text>;
    }
    return null;
};
