import { Suspense, lazy, ElementType } from 'react';
import { useRoutes } from 'react-router-dom';
import PageNotFound from '../components/PageNotFound';
import MainLayout from '../layouts/main';

const Loadable = (Component: ElementType) => (props: any) =>
(
    <Suspense fallback={'Loading...'}>
        <Component {...props} />
    </Suspense>
)
    ;

export default function Router() {
    return useRoutes([
        // Main Routes
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { path: 'list', element: <CustomerList /> },
                { path: 'customer/:type/:id', element: <AddEditCustomer /> },
                { path: 'customer/:type', element: <AddEditCustomer /> },
                { path: '*', element: <PageNotFound /> },
            ],
        },

    ]);
}


// // MAIN
const CustomerList = Loadable(lazy(() => import('../pages/cutomerList/CustomerList')));
const AddEditCustomer = Loadable(lazy(() => import('../pages/addEditCustomer/AddEditCustomer')));
// const Dashboard = Loadable(lazy(() => import('../pages/dashboard/breederDashboard/BreederDashboardController')));
