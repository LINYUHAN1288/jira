/**
 * @file 创建任务组
 * @author linyuhan
 */

import { Button, Drawer, Form, Input, Spin } from 'antd';
import { useAddEpic, useEpicQueryKey } from 'utils/epic';
import { useProjectIdInUrl } from 'utils/projects';
import { DrawerProps } from 'antd/es/drawer';
import styled from '@emotion/styled';

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
    const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
    const [form] = Form.useForm();

    const projectId = useProjectIdInUrl();

    const onFinish = async (values: any) => {
        await addEpic({ ...values, projectId });
    };

    return (
        <Drawer visible={props.visible} onClose={props.onClose} forceRender={true} destroyOnClose={true} width={'100%'}>
            <Container>
                {isLoading ? (
                    <Spin size={'large'} />
                ) : (
                    <div>
                        <h1>创建任务组</h1>
                    </div>
                )}
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;
