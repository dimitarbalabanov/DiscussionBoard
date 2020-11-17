import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import ConvertToRelativeTime from '../../utils/dateConvertor';

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStyles();

  return <Tooltip arrow placement="top" classes={classes} {...props} />;
}
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

{/* <Tooltip title="Delete">
  <MyComponent>
</Tooltip> */}

const CustomTooltip = props => {
  const {
    username,
    mediaUrl,
    postsCount,
    commentsCount,
    karma
  } = props;

  return (
    <Tooltip title={username}>
      <MyComponent />
    </Tooltip>
  );
}

export default CustomTooltip;