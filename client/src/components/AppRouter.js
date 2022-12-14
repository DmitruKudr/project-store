import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes, defaultPath} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    //console.log(user)
    return(
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path}  path={path} element={<Component/>} exact/>
            )}

            {publicRoutes.map(({path , Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate replace={true} to={defaultPath.path}/>}/>
        </Routes>
    );
};
export default AppRouter;