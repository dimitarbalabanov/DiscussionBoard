import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Welcome from './components/Welcome/Welcome';
import ForumCard from './components/ForumCard/ForumCard';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const Home = props => {
  const classes = useStyles();
  
  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };

  const { forums } = props;
  return (
    <React.Fragment>
      <Welcome post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {forums.map((forum) => (
          <ForumCard key={forum.title} forum={forum} />
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default Home;