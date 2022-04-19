import { Form, Input } from "antd";
import { User } from "types/user";
import { Project } from "types/project";

interface SearchPanelProps {
    users: User[];
    param: Partial<Pick<Project, "name" | "personId">>;
    setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    return (
        <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder="项目名"
                    type="text"
                    value={param.name}
                    onChange={(e) => {
                        setParam({
                            ...param,
                            name: e.target.value
                        });
                    }}
                ></Input>
            </Form.Item>
            <Form.Item></Form.Item>
        </Form>
    );
};
