/**
 * @file create-board 创建看板
 * @author linyuhan
 */

import { useState } from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import { useProjectIdInUrl } from 'utils/projects';
import { useAddBoard, useBoardQueryKey } from 'utils/board';

export const CreateBoard = () => {
    const [name, setName] = useState('');
    const projectId = useProjectIdInUrl();

    const { mutateAsync: addBoard } = useAddBoard(useBoardQueryKey());

    const submit = async () => {
        await addBoard({ name, projectId });
        setName('');
    };

    return (
        <Container>
            <Input size="large" value={name} onPressEnter={submit} onChange={e => setName(e.target.value)} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    min-width: 27rem;
    border-radius: 6px;
`;
