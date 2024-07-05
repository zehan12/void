import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Post, User } from "@/pages";

const ApplicationRoutes = () => {
    /**
     *
     *  here are the initial routes that we'll need in our system.
     *  
     */
    return (<>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path=":username" element={<User />} />
                <Route path="post" element={<Post />} />
            </Route>
        </Routes>
    </>)
}


export default ApplicationRoutes;
