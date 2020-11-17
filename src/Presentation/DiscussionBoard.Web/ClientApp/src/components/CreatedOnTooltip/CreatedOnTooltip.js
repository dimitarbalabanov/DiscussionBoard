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

const CreatedOnTooltip = props => {
  return (
    <BootstrapTooltip title={props.createdOn}>
      <Link>{ConvertToRelativeTime(props.createdOn)}</Link>
    </BootstrapTooltip>
  );
}

export default CreatedOnTooltip;