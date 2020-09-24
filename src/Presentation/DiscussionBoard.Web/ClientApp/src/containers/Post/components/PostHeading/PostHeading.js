import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const PostHeading = (props) => {
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h5">
        Lorem ipsum
      </Typography >
      <Typography gutterBottom variant="h6">
        Lorem ipsum
      </Typography >
      <Typography gutterBottom variant="subtitle1">
        Lorem ipsum
      </Typography>
      <Typography gutterBottom variant="caption" paragraph>
        Lorem ipsum by <Link>Merol muspi</Link>
      </Typography >
      <Typography paragraph>
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
      </Typography>
    </React.Fragment>
  );
}

export default PostHeading;