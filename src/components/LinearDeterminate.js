import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const calculateProgress = (totalRep, remainingRep) => {
  return (totalRep - remainingRep) / totalRep * 100;
}

export default function LinearDeterminate(props) {
  const classes = useStyles();
  const { moduleInfo } = props;
  var totalRepetition = null;
  var totalRemainingRepetition = null;

  if (moduleInfo) {
    totalRepetition = moduleInfo.totalRepetition/2; // could use 1
    totalRemainingRepetition = moduleInfo.totalRemainingRepetition;
  }
  
  const progressPercent = calculateProgress(totalRepetition, totalRemainingRepetition);
  console.log(`got ${totalRepetition-totalRemainingRepetition} out of ${totalRepetition}`)
  console.log(`progressPercent ${progressPercent}%`)

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progressPercent} />
    </div>
  );
}