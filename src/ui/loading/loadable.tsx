/**
 * @file Lazy Loading Component
 * @author linyuhan
 */

import { Suspense } from 'react';

import Loader from './loader';

const Loadable = (Component: any) => {
    return (props: Object) => {
        return (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );
    };
};

export default Loadable;
