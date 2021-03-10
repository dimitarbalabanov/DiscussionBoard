import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1)
  },
  button: {
    width: '150px',
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

const TopBar = props => {
  const classes = useStyles();
  const { routes } = props;

  return (
    <List className={classes.nav}>
      {routes.map(route =>
      <ListItem key={route.title} className={classes.item} disableGutters>
        <Button
          className={classes.button}
          disableElevation
          variant={route.variant}
          component={RouterLink}
          to={route.href}
          color="primary"
        >
          <div className={classes.icon}>{route.icon}</div>
          {route.title}
        </Button>
      </ListItem>)}
    </List>
  );
};

export default TopBar;