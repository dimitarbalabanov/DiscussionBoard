import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {toRelativeTime, toComplexTime} from '../../utils/dateConvertor';

const CreatorAndCreatedOn = props => {
  const [show, setShow] = React.useState(false);

  const {
    creatorUserName,
    createdOn,
  } = props;

  return (
    <Box display="flex" alignItems="center" mt={0.5} ml={0.5}>
      <Typography color="textSecondary" variant="body2">
      {" Posted "}
      {" by "} 
      <Link component={RouterLink} to={"/users/" + creatorUserName}>
          {'u/' + creatorUserName + ' '}
      </Link>
      <span onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}>
          {show ? toComplexTime(createdOn) : toRelativeTime(createdOn)}
      </span>
      </Typography>
    </Box>
  );
}

export default React.memo(CreatorAndCreatedOn);