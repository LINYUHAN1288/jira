import { Link } from 'react-router-dom';
import { Route, Routes, useLocation } from 'react-router';
import styled from '@emotion/styled';
import { Menu } from 'antd';

const useRouteType = () => {
    const units = useLocation().pathname.split('/');
    return units[units.length - 1];
};

export const ProjectPage = () => {
    const routeType = useRouteType();
    return (
        <Container>
            <Aside>
                <Menu mode={'inline'} selectedKeys={[routeType]}>
                    <Menu.Item>
                        <Link to=""></Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route></Route>
                    <Route></Route>
                </Routes>
            </Main>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`;

const Aside = styled.div`
    display: flex;
`;
const Main = styled.div`
    display: flex;
    background-color: black;
`;
