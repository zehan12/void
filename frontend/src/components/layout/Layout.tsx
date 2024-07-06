import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (<div className="max-w-full md:mx-0">
        <Header />
        <div className="max-w-[620px] mx-auto">
            <Outlet />
        </div>
    </div>);
};

Layout.displayName = "Layout";
export default Layout;