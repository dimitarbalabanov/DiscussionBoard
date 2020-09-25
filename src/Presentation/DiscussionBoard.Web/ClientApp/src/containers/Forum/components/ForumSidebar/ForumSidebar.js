import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const sidebar = {
  recent: [
    { title: 'First post', description: 'Etiam porta sem malesuada magna mollis euismod.' },
    { title: 'Second post', description: 'Etiam porta sem malesuada magna mollis euismod.' },
    { title: 'Third post', description: 'Etiam porta sem malesuada magna mollis euismod.' },
    { title: 'Forth post', description: 'Etiam porta sem malesuada magna mollis euismod.' },
  ],
  forums: [
    { title: 'Music', url: '#' },
    { title: 'Movies', url: '#' },
    { title: 'Programming', url: '#' },
    { title: 'Gaming', url: '#' },
    { title: 'General', url: '#' },
    { title: 'Whatever', url: '#' },
    { title: 'Politics', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const ForumSidebar = props => {
  const classes = useStyles();
  const { forums, social, recent } = sidebar;

  return (
    <Grid item xs={12} md={3}>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Forums
      </Typography>

      {forums.map((forum) => (
        <Link display="block" variant="body1" href={forum.url} key={forum.title}>
          {forum.title}
        </Link>
      ))}

      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network) => (
        <Link display="block" variant="body1" href="#" key={network.name}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}

      {recent.map((r) => (
        <React.Fragment key={r.title}>
          <Paper elevation={0} className={classes.sidebarAboutBox}>
           <Typography variant="h6" gutterBottom>
             {r.title}
           </Typography>
           <Typography>
             {r.description}
            </Typography>
         </Paper>
         <Divider />
        </React.Fragment>
      ))}
    </Grid>
  );
}

ForumSidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};

export default ForumSidebar;
