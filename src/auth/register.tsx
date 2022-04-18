import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();

    const handleSubmit = async (values: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (values.cpassword !== values.password) {
            return;
        }
    };

    return (
        <Form>
            <Form.Item></Form.Item>
        </Form>
    );
};
