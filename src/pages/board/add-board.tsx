/**
 * @file add-board
 * @author linyuhan
 */

import { useState } from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';

export const AddBoard = () => {
    const [name, setName] = useState('');

    const submit = async () => {
        setName('');
    };

    return (
        <Container>
            <Input size="large" value={name} onChange={e => setName(e.target.value)} />
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
