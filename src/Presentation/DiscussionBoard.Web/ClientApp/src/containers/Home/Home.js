import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
//import AnotherSpinner from '../../components/Spinner/AnotherSpinner';
import { makeStyles } from '@material-ui/core/styles';
//import Grid from '@material-ui/core/Grid';
//import Heading from './components/Heading/Heading';
import AlternateHeading from './components/Heading/AlternateHeading';
//import ForumCard from './components/ForumCard/ForumCard';
import Snackbar from '../../components/Snackbar/Snackbar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ComputerIcon from '@material-ui/icons/Computer';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AddIcon from '@material-ui/icons/Add';
import CommentIcon from '@material-ui/icons/Comment';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
    borderSpacing: "0 5px !important;",
    borderCollapse: "separate !important;"
  },
  custom: {
    borderSpacing: "0 5px !important;",
    borderCollapse: "separate !important;"
  }
}));
const icons = [<MovieCreationIcon />, <MusicNoteIcon />, <ComputerIcon />, <VideogameAssetIcon />, <AddIcon />]
const Home = props => {
  const classes = useStyles();

  const { 
    forums,
    loading,
    error,
    onFetchForums,
    // showSnackbar,
    // type
   } = props;

  useEffect(() => {
    onFetchForums();
  }, [onFetchForums]);

  let forumsDiv = <Spinner />;
  // let forumsDiv = <AnotherSpinner />;

  if (!loading && !error && forums) {
    forumsDiv = (
      // <Grid container spacing={4}>
      //   {forums.map((forum) => (
      //     <ForumCard key={forum.id} forum={forum} />
      //   ))}
      // </Grid>
      <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody className={classes.custom}>
          {forums.map((forum, i) => (
            <TableRow 
              key={forum.id} component={Link} to={`/forums/${forum.id}`} className={classes.custom}>
              <TableCell align="right" variant="head" className={classes.custom}>
                  {icons[i]}
              </TableCell>
              <TableCell component="th" scope="row" align="left" variant="head" className={classes.custom}>
                <strong>{forum.title}</strong>
              </TableCell>

              <TableCell align="center">
                {forum.description}
              </TableCell>
              <TableCell align="right">
                <ModeCommentIcon />
              </TableCell>
              <TableCell align="left">
                {forum.postsCount} {' '} Posts
              </TableCell>
              <TableCell align="right">
                <CommentIcon />
              </TableCell>
              <TableCell align="left">
                {forum.commentsCount} {' '} Comments
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }

  return (
    <Page className={classes.root} title="Discussion Board">
      { error ? <Snackbar message={error} type="error" reset={() => {}}/> : null }
      <AlternateHeading />
      {forumsDiv}
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.home.forums,
    loading: state.home.loading,
    error: state.home.error,
    // showSnackbar: state.snackbar.show,
    // type: state.snackbar.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(actions.fetchForums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);