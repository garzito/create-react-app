/* Structural Modules */
import React, { useState, useEffect } from 'react';
import { Treebeard } from 'react-treebeard';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

/* Functional Modules */
import { makeStyles } from '@material-ui/core/styles';
import { convertData } from '../../../helpers/parseTreeData';

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div:first-child': {
      maxWidth: '25%',
      flexBasis: 'calc(25% - 20px)',
      border: '1px solid #eaeaea',
    },
    '& > div:nth-child(2)': {
      maxWidth: '75%',
      flexBasis: 'calc(75% - 20px)',
      border: '1px solid #eaeaea',
    }
  },
  treeContainer: {
    backgroundColor: 'rgb(49, 54, 63)',
  },
  editorContainer: {
    fontSize: '1.1rem',
  },
  green: {
    fontFamily: 'monospace',
    color: '#4ba910',
    fontSize: '1rem',
  },
}));

export const TreeAndEditor = props => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const onToggle = (node, toggled) => {
    if (cursor) cursor.active = false;
    node.active = true;
    if (node.children) node.toggled = toggled;
    setCursor(node);
    if (node.path) {
      loadFile(`/index.html`);
    }
  };
  const loadFile = async url => {
    const request = await fetch(url);
    const response = await request.text();
    setEditorValue(response);
  };
  const handleEditorChange = (editor, data, value) => setEditorValue(value);

  useEffect(() => {
    const getData = async () => {
      const request = await fetch('/data/tree-data.json');
      const response = await request.json();
      const data = convertData(response);
      
      setData(data);
      setDataLoaded(true);
    };
    getData();
  }, [dataLoaded])

  return <div>
    <h1>A Tree Component and and Editor Component</h1>
    <p>
      This is an example of the two Iconics components.
      The <span className={classes.green}>&lt;ovp-tree&gt;</span> and
      the <span className={classes.green}>&lt;ovp-editor&gt;</span> component.
      It will load the tree from a JSON file and when you click on a
      file it will show it in the editor window.
    </p>
    <div className={classes.flexContainer}>
      <div className={classes.treeContainer}>
        <Treebeard data={data} onToggle={onToggle} />
      </div>
      <div className={classes.editorContainer}>
        <CodeMirror
          value={editorValue}
          onBeforeChange={handleEditorChange}
          options={{
            mode: { name: 'javascript', json: true },
            lineNumbers: true,
            autofocus: true,
          }}
        />
      </div>
    </div>
  </div>;
};

export default TreeAndEditor;