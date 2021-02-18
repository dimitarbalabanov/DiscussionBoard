import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PeopleIcon from '@material-ui/icons/People';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import { ListItem, colors } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const authRoutes = [
  {
    title: 'Profile',
    href: '/profile',
    icon: <PersonIcon />
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: <TextFieldsIcon />
  }
];

const guestRoutes = [
  {
    title: 'Login',
    href: '/login',
    icon: <PeopleIcon />
  },
  {
    title: 'Register',
    href: '/register',
    icon: <LockOpenIcon />
  }
];
const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1)
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));
const MobileBar = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const { isAuth, username } = props;

  let routes = isAuth ? authRoutes : guestRoutes;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        
        onClick={handleClick}
      >
        <PersonIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {routes.map(route =>
        <MenuItem>
          <ListItem className={classes.item} disableGutters key={route.title}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={RouterLink}
              to={route.href}
            >
              <div className={classes.icon}>{route.icon}</div>
              {route.title}
            </Button>
          </ListItem>
        </MenuItem>)}
      </StyledMenu>
    </div>
  );
}

export default MobileBar;