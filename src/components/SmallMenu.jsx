/* eslint-disable react/prop-types */
import { ModeNight } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const SmallMenu = ({ setMode, mode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          width: "35px",
          height: "40px",
        }}
      >
        <Stack position="relative" paddingRight={4}>
          <Box
            sx={{
              position: "absolute",
              width: open ? "35px" : "30px",
              height: "3px",
              backgroundColor: "white",
              top: "0px",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: " 0.2s ease",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "30px",
              top: "10px",
              height: "3px",
              backgroundColor: "white",
              display: open ? "none" : "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: open ? "35px" : "30px",
              height: "3px",
              top: open ? "0" : "-10px",
              transform: open ? "rotate(-45deg)" : "rotate(0deg)",
              backgroundColor: "white",
              transition: " 0.2s ease",
            }}
          />
        </Stack>
      </Button>

      <Menu
        id="account-menu"
        open={open}
        onClose={() => setOpen(false)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          position: "absolute",
          top: "50px",
          right: "50px",
        }}
      >
        <List sx={{ width: { xs: "300px", md: "600px" } }}>
          <ListItem>
            <ListItemButton
              component={Link}
              to="/cards"
              onClick={() => setOpen(false)}
            >
              <ListItemText primary="View all cards" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component={Link}
              to="/evo-cards"
              onClick={() => setOpen(false)}
            >
              <ListItemText primary="View evolution cards" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component={Link}
              to="/create-deck"
              onClick={() => setOpen(false)}
            >
              <ListItemText primary="Create new deck" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
                // eslint-disable-next-line no-unused-vars
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </>
  );
};

export default SmallMenu;