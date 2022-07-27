import "./style.css"
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Link } from 'react-router-dom'
import React, { useContext } from "react";
import PropTypes from "prop-types";
import userContext from "../../contexts/userContext";
import UserIcon from "../userIcon";

export const Header = ({ handleClickOpenArt, handleClickOpenLogin }) => {
  const { authenticated, user } = useContext(userContext);
  const pages = [
    {
      name: 'Articles',
      link: '/'
    },
    {
      name: 'Users',
      link: 'users'
    }
  ];
  const settings = ['Profile', 'Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BlurOnIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 'auto',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The New<u>Tech</u>
          </Typography>

          {authenticated &&
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.link}>
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
          <BlurOnIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The New<u>Tech</u>
          </Typography>
          {authenticated &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 5 }}>
              {pages.map((page) => (
                <Link
                  to={page.link}
                  key={page.name}
                >
                  <Button
                    variant='outlined'
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      '&:hover': {
                        borderBottomColor: 'white',
                      }
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          }
          {authenticated &&
            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
              <Button
                variant='outlined'
                onClick={handleClickOpenArt}
                sx={{
                  my: 2, borderColor: 'white', color: 'white', display: 'block',
                  '&:hover': {
                    borderBottomColor: 'white',
                  }
                }}
              >
                Add Article
              </Button>
            </Box>
          }
          <Box sx={{ flexGrow: 0 }}>
            {!authenticated &&
              <Button
                onClick={handleClickOpenLogin}
                variant='outlined'
                sx={{ float: 'right', my: 2, borderColor: 'white', color: 'white', display: 'flex',
                  '&:hover': {
                  borderBottomColor: 'white',
                  }}}
              >
                Sign In/Up
              </Button>
            }
            {authenticated &&
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserIcon avatar={user.Avatar} fullName={user.FullName} size={40} />
                </IconButton>
              </Tooltip>
            }
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to={setting.toLowerCase()}>
                        {setting}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.prototype = {
  handleClickOpenArt: PropTypes.func.isRequired,
  handleClickOpenLogin: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
}