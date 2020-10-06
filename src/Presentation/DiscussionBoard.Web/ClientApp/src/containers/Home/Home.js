import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
//import AnotherSpinner from '../../components/Spinner/AnotherSpinner';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Heading from './components/Heading/Heading';
//import AlternateHeading from './components/Heading/AlternateHeading';
import ForumCard from './components/ForumCard/ForumCard';
import HomePostCard from './components/HomePostCard/HomePostCard';
import Snackbar from '../../components/Snackbar/Snackbar';

import Skeleton from '@material-ui/lab/Skeleton';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
//import CommentIcon from '@material-ui/icons/Comment';

//import NestedGrid from './Sample';
//import Search from '../../components/SearchToolbar/SearchToolbar';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
//import MovieCreationIcon from '@material-ui/icons/MovieCreation';
//import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import ComputerIcon from '@material-ui/icons/Computer';
//import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
//import AddIcon from '@material-ui/icons/Add';
// import CommentIcon from '@material-ui/icons/Comment';
// import ModeCommentIcon from '@material-ui/icons/ModeComment';
// import { Link } from 'react-router-dom';
//import AnotherCard from './components/ForumCard/AnotherCard';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    //marginTop: theme.spacing(2),
  },
  // table: {
  //   minWidth: 650,
  //   borderSpacing: "0 5px !important;",
  //   borderCollapse: "separate !important;"
  // },
  // custom: {
  //   borderSpacing: "0 5px !important;",
  //   borderCollapse: "separate !important;"
  // }
}));
//const icons = [<MovieCreationIcon />, <MusicNoteIcon />, <ComputerIcon />, <VideogameAssetIcon />, <AddIcon />]
const Home = props => {
  const classes = useStyles();

  const { 
    forums,
    forumsLoading,
    forumsError,
    onFetchForums,
    posts,
    postsLoading,
    postsError,
    onFetchPosts,
    // showSnackbar,
    // type
   } = props;

  useEffect(() => {
    onFetchForums();
    onFetchPosts();
  }, [onFetchForums, onFetchPosts]);

  let forumsDiv = <Spinner />;
  let postsDiv = <Spinner />
  
  // let forumsDiv = (
  //   <Grid container spacing={4} className={classes.mainGrid} >
  //     {[1,2,3,4,5].map((i) => (
  //       <Grid item xs={6} md={4} key={i}>
  //             <Card className={classes.card}>
  //               <div className={classes.cardDetails}>
  //                 <CardContent>
  //                   <Typography component="h2" variant="h3">
  //                     <Skeleton />
  //                   </Typography>
  //                   <Typography variant="subtitle1" paragraph>
  //                   <Skeleton />
  //                   </Typography>
  //                       <Typography color="textSecondary" display="inline" variant="body2" >
  //                       <Skeleton />
  //                       </Typography>

  //                       <Typography color="textSecondary" display="inline" variant="body2" >
  //                       <Skeleton />
  //                       </Typography>
  //                 </CardContent>
  //               </div>
  //             </Card>
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
  
  if (!forumsLoading && !forumsError && forums) {
    forumsDiv = (
      <Grid container spacing={4} className={classes.mainGrid} >
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </Grid>
    );
  }

  if (!postsLoading && !postsError && posts) {
    postsDiv = (
      <Grid container spacing={2} className={classes.mainGrid} justify="center">
        {posts.map((post) => (
          <HomePostCard key={post.id} post={post} />
        ))}
      </Grid>
    );
  }

  return (
    <Page className={classes.root} title="Discussion Board">
      { forumsError ? <Snackbar message={forumsError} type="error" reset={() => {}}/> : null }
      { postsError ? <Snackbar message={postsError} type="error" reset={() => {}}/> : null }
      {/* <AlternateHeading /> */}

      <Grid container spacing={5} className={classes.mainGrid}>
        <Grid item xs={12} md={8}>
          {postsDiv}
        </Grid>
        <Grid item xs={12} md={4}>
          {forumsDiv}
        </Grid>
      </Grid>


    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.home.forums,
    forumsLoading: state.home.forumsLoading,
    forumsError: state.home.forumsError,
    posts: state.home.posts,
    postsLoading: state.home.postsLoading,
    postsError: state.home.postsError,
    // showSnackbar: state.snackbar.show,
    // type: state.snackbar.type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(actions.fetchForums()),
    onFetchPosts: () => dispatch(actions.fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);





//   <Grid container spacing={4} className={classes.mainGrid}>
    //   {forums.map((forum) => (
    //     <AnotherCard key={forum.id} forum={forum} />
    //   ))}
    // </Grid>
      // <React.Fragment>
      // {forums.map((forum) => (
      //   <NestedGrid key={forum.id} forum={forum} />
      // ))}
      // </React.Fragment>
    //   <TableContainer component={Paper}>
    //   <Table className={classes.table}>
    //     <TableBody className={classes.custom}>
    //       {forums.map((forum, i) => (
    //         <TableRow 
    //           key={forum.id} component={Link} to={`/forums/${forum.id}`} className={classes.custom}>
    //           <TableCell align="right" variant="head" className={classes.custom}>
    //               {icons[i]}
    //           </TableCell>
    //           <TableCell component="th" scope="row" align="left" variant="head" className={classes.custom}>
    //             <strong>{forum.title}</strong>
    //           </TableCell>

    //           <TableCell align="center">
    //             {forum.description}
    //           </TableCell>
    //           <TableCell align="right">
    //             <ModeCommentIcon />
    //           </TableCell>
    //           <TableCell align="left">
    //             {forum.postsCount} {' '} Posts
    //           </TableCell>
    //           <TableCell align="right">
    //             <CommentIcon />
    //           </TableCell>
    //           <TableCell align="left">
    //             {forum.commentsCount} {' '} Comments
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>