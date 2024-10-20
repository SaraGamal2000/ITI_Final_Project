//import React, { useState, useMemo } from "react";
//import "./App.css";
//import AppRoute from "./Routes/routes";
//import MainWrapper from "./components/layouts/MainWrapper";
//import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
//import Box from "@mui/material/Box";
//import TopBar from "./component/admin/TopBar";
//import SideBar from "./component/admin/SideBar";
//import { Outlet } from "react-router-dom";
//import { getDesignTokens } from "./theme";
//import { BrowserRouter as Router } from 'react-router-dom'; // Correct import for BrowserRouter
//
//function App() {
//  const [open, setOpen] = useState(false);
//  const [mode, setMode] = useState("light");
//
//  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//
//  const handleDrawerOpen = () => {
//    setOpen(true);
//  };
//
//  const handleDrawerClose = () => {
//    setOpen(false);
//  };
//
//  return (
//    <ThemeProvider theme={theme}> {/* Wrap the app in ThemeProvider */}
//      <Router> {/* Use Router component */}
//        <MainWrapper>
//          {/*<AppRoute />*/}
//          <CssBaseline />
//          <Box sx={{ display: "flex" }}>
//            <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
//            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//              <DrawerHeader />
//              <Outlet /> {/* This renders the nested routes */}
//            </Box>
//          </Box>
//        </MainWrapper>
//      </Router>
//    </ThemeProvider>
//  );
//}
//
//export default App;

import "./App.css";
import AppRoute from "./Routes/routes";
import MainWrapper from "./components/layouts/MainWrapper";
import { styled } from "@mui/material/styles";
// import "./style.css";
import cart from "../src/context/cart";
import { useState } from "react";

function App() {
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }));
    const [carts, setCarts] = useState(0);

    return (
        <>
            <cart.Provider value={{ carts, setCarts }}>
                <MainWrapper>
                    <AppRoute />
                </MainWrapper>
            </cart.Provider>
        </>
    );
}

export default App;

//import React, { useState, useMemo } from "react";
//import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
//import Box from "@mui/material/Box";
//import TopBar from "./component/admin/TopBar";
//import SideBar from "./component/admin/SideBar";
//import { Outlet } from "react-router-dom";
//import { getDesignTokens } from "./theme";
//
//const DrawerHeader = styled("div")(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "flex-end",
//  padding: theme.spacing(0, 1),
//  ...theme.mixins.toolbar,
//}));
//
//export default function App() {
//  const [open, setOpen] = useState(false);
//  const [mode, setMode] = useState("light");
//
//  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//
//  const handleDrawerOpen = () => {
//    setOpen(true);
//  };
//
//  const handleDrawerClose = () => {
//    setOpen(false);
//  };
//
//  return (
//    <ThemeProvider theme={theme}>
//      <CssBaseline />
//      <Box sx={{ display: "flex" }}>
//        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
//        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//          <DrawerHeader />
//          <Outlet /> {/* This renders the nested routes */}
//        </Box>
//      </Box>
//    </ThemeProvider>
//  );
//}
//

// import logo from "./logo.svg";
//import React, { useState, useMemo } from "react";
//import "./App.css";
//import AppRoute from "./Routes/routes";
//import MainWrapper from "./components/layouts/MainWrapper";
////import MainWrapper from "./components/layouts/MainWrapper";
////import * as React from "react";
//import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
//import Box from "@mui/material/Box";
//import TopBar from "./component/admin/TopBar";
//import SideBar from "./component/admin/SideBar";
//import { Outlet } from "react-router-dom";
//import { getDesignTokens } from "./theme";
//import { BrowserRouter  } from 'react-router-dom';
//
//// import "./style.css";
//
//function App() {
//  const [open, setOpen] = useState(false);
//  const [mode, setMode] = useState("light");
//
//  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//
//  const handleDrawerOpen = () => {
//    setOpen(true);
//  };
//
//  const handleDrawerClose = () => {
//    setOpen(false);
//  };
//    return (
//        <>
//         <BrowserRoute>
//            <MainWrapper>
//                <AppRoute />
//                <CssBaseline />
//                <Box sx={{ display: "flex" }}>
//                 <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
//                 <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//                 <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <DrawerHeader />
//                 <Outlet /> {/* This renders the nested routes */}
//                 </Box>
//                </Box>
//            </MainWrapper>
//         </BrowserRoute>
//        </>
//    );
//}
//
//export default App;
//
//
//
//
//
//
//
//
//const DrawerHeader = styled("div")(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "flex-end",
//  padding: theme.spacing(0, 1),
//  ...theme.mixins.toolbar,
//}));
//
//export default function App() {
//  // Drawer state
//  const [open, setOpen] = React.useState(false);
//
//  // Theme mode state
//  const [mode, setMode] = React.useState("light");
//
//  // Theme configuration based on mode
//  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//
//  // Functions to handle drawer opening/closing
//  const handleDrawerOpen = () => {
//    setOpen(true);
//  };
//
//  const handleDrawerClose = () => {
//    setOpen(false);
//  };
//
//  return (
//    <ThemeProvider theme={theme}>
//      <CssBaseline />
//      <Box sx={{ display: "flex" }}>
//        {/* TopBar: Includes theme toggle and drawer open logic */}
//        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
//
//        {/* SideBar: Includes drawer close logic */}
//        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//
//        {/* Main content area */}
//        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//          <DrawerHeader />
//          {/* Routes managed by AppRoute or Outlet */}
//          <MainWrapper>
//            {/*<Outlet/>*/}
//              <AppRoute/>
//          </MainWrapper>
//        </Box>
//      </Box>
//    </ThemeProvider>
//  );
//}
//

//// import logo from "./logo.svg";
//import "./App.css";
//import AppRoute from "./Routes/routes";
//import MainWrapper from "./components/layouts/MainWrapper";
//import * as React from "react";
//import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
//import Box from "@mui/material/Box";
//import TopBar from "./component/admin/TopBar";
//import SideBar from "./component/admin/SideBar";
//import { Outlet } from "react-router-dom";
//import { getDesignTokens } from "./theme";
//// import "./style.css";
//
//
//const DrawerHeader = styled("div")(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "flex-end",
//  padding: theme.spacing(0, 1),
//  ...theme.mixins.toolbar,
//}));
//
//export default function MiniDrawer() {
//  const [open, setOpen] = React.useState(false);
//  const [mode, setMode] = React.useState("light");
//
//
//  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
//
//  const handleDrawerOpen = () => {
//    setOpen(true);
//  };
//
//  const handleDrawerClose = () => {
//    setOpen(false);
//  };
//
//  return (
//    <ThemeProvider theme={theme}>
//      <CssBaseline />
//      <Box sx={{ display: "flex" }}>
//        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
//        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//          <DrawerHeader />
//          <Outlet />
//        </Box>
//      </Box>
//    </ThemeProvider>
//  );
//}
//
//
//
//function App() {
//    return (
//        <>
//            <MainWrapper>
//                <AppRoute />
//            </MainWrapper>
//        </>
//    );
//}
//
//export default App;
