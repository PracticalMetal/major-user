import React, { useState } from "react";
import Tesseract from "tesseract.js";

import { useNavigate } from "react-router-dom";
import { auth, database, storage } from "../../firebase-config.js";
import {
  ref as databaseRef,
  get,
  set,
  update
} from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable
} from "firebase/storage";
import { 
  styled,
  createTheme,
  ThemeProvider 
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./listItems";
import ActiveUsers from "./ActiveUsers";

import AppAppBar from "../AppAppBar"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "none", // Remove box shadow
  borderBottom: `1px solid ${theme.palette.divider}`, // Add border bottom
  backgroundColor: theme.palette.primary.main, // Change background color
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));


const defaultTheme = createTheme();

export default function Dashboard() {
  const name='Pulkit Mittal';
  const role='admin';
  const organization='Maharaja Surajmal Institute of Technology'
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };


  const [image, setImage] = useState(null);
  const [title, setTitle]=useState("");
  const [eventDate, setEventDate]=useState("");
  const [recognizedText, setRecognizedText] = useState("");
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppAppBar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent ActiveUsers */}
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <ActiveUsers org={organization} />
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ pt: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
              >
                {name} © {new Date().getFullYear()} -{" "}
                <Link color="inherit" href="https://msit.in/">
                  MSIT
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
