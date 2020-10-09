import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeIcon from '@material-ui/icons/Home';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/Receipt';



import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import {HTTP} from "../../HTTP/http"

import { Link, NavLink, useHistory  } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const [user, setUser] = useState('No user found')

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navStyle = {
    textDecoration: "none",
    color: "inherit"
  };


  const findIcon = text => {
    switch(text) {
      case 'Hjem' : return <HomeIcon/>
      case 'Madplaner' : return <ScheduleIcon/>
      case 'Opskrifter' : return <ReceiptIcon/>
      case 'Mine tilbud' : return <AttachMoneyIcon/>
      case 'Søg tilbud' : return <TrendingDownIcon/>
      default : return <FastfoodIcon/>
    }
  }



    useEffect(()=> {


      const token = localStorage.getItem('token')  
      const requestBody = {
          query: `query{verifyUser(token: "${token}") { 
            firstName
            lastName
            email
          }
        }`
      }
      

      HTTP.post(requestBody, token)
          .then(response => {

              if(response.errors) {
              } else {
                const {firstName, lastName } = response.data.verifyUser
                setUser(firstName + ' ' + lastName)
              }
          })
          .catch((err) => {
              console.log('Verification err: ' + err);
          })
  }, [])



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          
          <Typography variant="h6" align="right" display="block" className={classes.appBar}style={{ flex: 1 }}
>          </Typography>

          <div >
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open1}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Min konto</MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavLink to="home" style={navStyle}>Log ud</NavLink>
                </MenuItem>

              </Menu>
            </div>


          <Typography variant="h6" align="right" display="block" className={classes.appBar}>
            {user}
          </Typography>


        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >


        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Hjem', 'Madplaner', 'Opskrifter'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{findIcon(text)}</ListItemIcon>
              
                <NavLink to='/' style={navStyle} activeClassName="active">
                  <ListItemText primary={text} />
                </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Mine tilbud', 'Søg tilbud'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{findIcon(text)}</ListItemIcon>

              <NavLink to='/home' style={navStyle} activeClassName="active">
                <ListItemText primary={text} />
              </NavLink>
              
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
