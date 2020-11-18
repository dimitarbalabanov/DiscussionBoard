import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const RulesAccordion = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.rules ? props.rules.map(rule => 
        <Accordion key={rule.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{rule.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {rule.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
}

export default RulesAccordion;