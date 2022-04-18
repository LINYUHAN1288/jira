import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import React from "react";
import { useAsync } from "utils/use-async";

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
    const { login } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    const handleSubmit = async (values: {
        username: string;
        password: string;
    }) => {
        try {
            await run(login(values));
        } catch (e: any) {
            onError(e);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item>
                <Input></Input>
            </Form.Item>
            <Form.Item>
                <Input></Input>
            </Form.Item>
            <Form.Item>
                <Input></Input>
            </Form.Item>
        </Form>
    );
};
