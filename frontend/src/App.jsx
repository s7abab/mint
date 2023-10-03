import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { privateRoutes, publicRoutes } from "./routes/routes";

import { useSelector } from "react-redux";
import socket from "./services/socket";
import { Loading } from "./components/Loading";

const App = () => {
  const { _id } = useSelector((state) => state.auth);
  useEffect(() => {
    socket.current = socket;
    socket.current.emit("add:user", _id);
    socket.current.on("get:users", (users) => {
    });

    return () => {
      socket.current.off("get:users");
    };
  }, [_id]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          <Route element={<PublicRoute />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
