import React from 'react'
import getRoutes, { RouteWrapper } from './route/RouteObject'
import { Route, Routes } from 'react-router-dom'

function App () {
  const routes = getRoutes()

  const renderedRoutes = Object.values(routes).map((route, index) => (
        <Route
            key={index} // Set the key for the outer Route component
            path={route.path}
            element={
                <RouteWrapper
                    key={route.title} // Set the key for the RouteWrapper component
                    path={route.path}
                    title={route.title}
                    permissions={route.permissions}
                    element={route.element}
                    layout={route.layout}
                />
            }
        />
  ))

  return <Routes>{renderedRoutes}</Routes>
}

export default App
