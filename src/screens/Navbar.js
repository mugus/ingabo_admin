import React,{useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../img/icon.png';
import user_default from '../img/default-img.png';
const pages = ['Crops', 'Products'];
const settings = ['Profile', 'Settings', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const language = localStorage.getItem('language');
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log('Event',event.target);
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

  const HandleLogout = async() => {
    localStorage.clear();
    window.location.replace('./');
  }



  const switchLanguage = () => {
    // english = 2
    // kinya = 1
    // let lan = language
    if(language == 1){
      localStorage.setItem('language',2)
      window.location.reload()
    }else{
      localStorage.setItem('language',1)
      window.location.reload()
    }
    
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="./"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Avatar alt="John Doe" src={logo} />
          </Typography>

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
              //   <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              //   {pages.map((page) => (
              //     <Button
              //       href={page}
              //       key={page}
              //       onClick={handleCloseNavMenu}
              //       sx={{ my: 2, color: 'white', display: 'block' }}
              //     >
              //       {page}
              //     </Button>
              //   ))}
              // </Box>
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button
                      href={page}
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ color: 'primary', display: 'block' }}
                    >
                    {page}
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                href={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Change language">
                  <Typography textAlign="center">
                   
                    </Typography>
            </Tooltip>
            </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="John Doe" src={user_default} />
              </IconButton>
            </Tooltip>
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
              <MenuItem>
                  <Typography textAlign="center">
                  {
                    language == 1 ?
                      <Button color='secondary' href="#" onClick={switchLanguage} >
                        Switch to English
                      </Button>
                    :
                      <Button color='secondary' href="#" onClick={switchLanguage} >
                        Switch to Kinyarwanda
                      </Button>
                  }
                    </Typography>
                </MenuItem>
                



               <MenuItem>
                  <Typography textAlign="center">
                    <Button
                      href='Profile'
                      >Profile</Button>
                    </Typography>
                </MenuItem>

                <MenuItem>
                  <Typography textAlign="center">
                    <Button
                      onClick={HandleLogout}
                      >Logout</Button>
                    </Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
  );
};
export default Navbar;
