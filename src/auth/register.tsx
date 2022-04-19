import React from "react";
import { Form, Input, Button } from "antd";
import { useAuth } from "context/auth-context";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    const handleSubmit = async (values: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (values.cpassword !== values.password) {
            onError(new Error("请确认两次输入的密码相同"));
            return;
        }
        try {
            await run(register(values));
        } catch (e: any) {
            onError(e);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name={"username"}
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input
                    placeholder={"用户名"}
                    type="text"
                    id={"username"}
                ></Input>
            </Form.Item>
            <Form.Item
                name={"password"}
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input
                    placeholder={"密码"}
                    type="password"
                    id={"password"}
                ></Input>
            </Form.Item>
            <Form.Item
                name={"cpassword"}
                rules={[{ required: true, message: "请确认密码" }]}
            >
                <Input
                    placeholder={"确认密码"}
                    type="password"
                    id={"cpassword"}
                ></Input>
            </Form.Item>
            <Form.Item>
                <LongButton
                    loading={isLoading}
                    htmlType={"submit"}
                    type="primary"
                >
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};

const LongButton = styled(Button)`
    width: 100%;
`;
