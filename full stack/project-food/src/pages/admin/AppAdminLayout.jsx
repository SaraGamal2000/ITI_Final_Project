// import
// import { Outlet } from "react-router-dom";

// ui component
// import Footer from "../../component/footer/footer";
// import Nav from "../../component/navbar/nav";
import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TopBar from "../../component/admin/TopBar";
import SideBar from "../../component/admin/SideBar";
import { Outlet } from "react-router-dom";
import { getDesignTokens } from "../../theme";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


function AppAdminLayout() {
    const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState("light");


  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    return (
        <>

      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} mode={mode} />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>

        </>
    );
}

export default AppAdminLayout;
