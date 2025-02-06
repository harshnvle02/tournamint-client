import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../Context/AuthConntext";
import { useContext } from "react";

const NavbarWithDrawer = (props) => {

  const { user } = useContext(AuthContext);

  console.log("user in navbar: ", user);
  return (
    <>

      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          height: "60px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1301,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            G a m e H o s t
          </Typography>

          <Button color="inherit" sx={{ color: "black" }}>
            <AccountCircle sx={{ marginRight: "5px" }} />
            {user?.username || "Guest"}
          </Button>
        </Toolbar>
      </AppBar>


      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          mt: "60px",
        }}
      >

        <Sidebar />

        {props.children}

      </Box>
    </>
  );
};

export default NavbarWithDrawer;
