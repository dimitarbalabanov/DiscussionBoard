import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import RuleAccordion from './RuleAccordion';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderColor: theme.palette.primary.main,
    border: '1px solid',
    marginTop: theme.spacing(5)
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    marginTop: theme.spacing(1)
  },
  text: {
    color: theme.palette.background.default
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const RulesCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;


  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h4">
            {"Forum rules"}
            <Divider />
          </Typography>
          
          {forum ? <RuleAccordion rules={forum.rules}/> : null}

          {/* <Typography className={classes.title} color="textSecondary" display="inline" variant="body2"> 
            {loading || !forum ? <Skeleton /> : forum.description}
          </Typography> */}
          {/* <Divider className={classes.margin}/> */}
        </CardContent>
      </div>
    </Card>
  );
}

export default RulesCard;