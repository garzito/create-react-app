/* Structural Modules */
import React, { useState, useEffect } from 'react';

/* UI Modules */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CheckCirleOutline from '@material-ui/icons/CheckCircleOutline';

/* Functional Modules */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  select: {
    width: 200,
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainContainer: {
    flexBasis: 'calc(50% - 30px)',
  },
  button: {
    margin: '1rem 0',
  },
  aligned: {
    display: 'flex',
    alignItems: 'center',
  }
});

export const SimpleDropdown = () => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [secondDataList, setSecondDataList] = useState([]);
  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  const handleChangeFirstSelect = e => setFirstSelect(e.target.value);
  const handleChangeSecondSelect = e => setSecondSelect(e.target.value);
  const selectChicago = () => setFirstSelect(1);
  const getMockData = async fn => {
    const response = await fetch('/data/test-data-name.json');
    const data = await response.json();
    return fn(data);
  };
  const loadDropdown = () => getMockData(setSecondDataList);

  useEffect(() => {
    getMockData(setDataList);
  }, [dataList.length]);

  return (
    <div>
      <h2>Simple Dropdown Example</h2>
      <div className={classes.body}>
        <div className={classes.mainContainer}>
          <p>
            Load data from a JSON file and populate a dropdown when the page loads. If you click on the
            "Select Chicago" button, Chicago will be selected.
          </p>
          <div>
            <FormControl>
              <InputLabel htmlFor="city">City / State</InputLabel>
              <Select
                value={firstSelect}
                onChange={handleChangeFirstSelect}
                autoWidth
                className={classes.select}
                inputProps={{
                  name: 'city',
                  id: 'city',
                }}
              >
                {dataList.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="info"
            className={classes.button}
            onClick={selectChicago}
          >Select Chicago</Button>
        </div>
        <div className={classes.mainContainer}>
          <p>
            Load data from a JSON file and populate a dropdown by clicking the button.
            Then when a selection is made on the second dropdown, it will update the first dropdown.
          </p>
          <div className={classes.aligned}>
            <FormControl>
              <InputLabel htmlFor="city">City / State</InputLabel>
              <Select
                value={secondSelect}
                onChange={handleChangeSecondSelect}
                autoWidth
                className={classes.select}
                inputProps={{
                  name: 'city',
                  id: 'city',
                }}
              >
                {secondDataList.map(el => <MenuItem value={el.id}>{el.name}</MenuItem>)}
              </Select>
            </FormControl>
            {!!secondDataList.length &&
              <span className={classes.aligned}>Loaded <CheckCirleOutline htmlColor="green" /></span>}
          </div>
          <Button
            variant="contained"
            color="info"
            className={classes.button}
            onClick={loadDropdown}
          >Load Dropdown</Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDropdown;