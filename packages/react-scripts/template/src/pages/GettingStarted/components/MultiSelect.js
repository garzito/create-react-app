import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 400,
    height: 400,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
const not = (a, b) => {
  if (typeof a[0] === 'string') {
    return a.filter(value => !b.find(el => el.id === value));
  }
  return a.filter(value => !b.includes(value));
};
const intersection = (a, b) => b.filter(value => a.find(el => el === value.id));

export default function MultiSelect() {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const getMockData = async fn => {
    const response = await fetch('/data/test-data-name.json');
    const data = await response.json();
    setDataLoaded(true);
    return setLeft(data);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight([...right, ...left]);
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked]);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft([...left, ...rightChecked]);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft([...left, ...right]);
    setRight([]);
  };

  const customList = items => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map(({ id, name }) => {
          const labelId = `transfer-list-item-${id}-label`;

          return (
            <ListItem key={id} role="listitem" button onClick={handleToggle(id)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  useEffect(() => {
    getMockData();
  }, [dataLoaded]);

  return (
    <div>
      <p>Here is an example using the multi-select component</p>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    </div>
  );
}