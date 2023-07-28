import TenantTable from "./components/TenantTable";
import BeautifulTable from "./components/BeautifulTable";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import TenantList from "./pages/TenantList";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TenantList />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
