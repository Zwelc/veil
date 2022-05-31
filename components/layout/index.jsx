import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import router from "next/router";
import Search from "../search";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              cursor: "pointer",
              color: "inherit",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => router.push("/")}
          >
            Veil
          </Typography>
          <Divider />
          <Search />
        </Toolbar>
      </AppBar>
      <Box component="main">{children}</Box>
    </Box>
  );
}
