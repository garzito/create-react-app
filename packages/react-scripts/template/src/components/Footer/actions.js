import { SET_VERSION_INFO } from '../../store/reducers/versionReducer';

export const getUIVersion = () => async dispatch => {
  const options = {
    headers: { 'Content-Type': 'text/markdown' }
  };

  try {
    const response = await fetch('/CHANGELOG.md', options);
    const parsedResponse = await response.text();
    const nodes = parsedResponse.split('## [');
    const nodeLines = nodes[1].split('###');
    const version = nodeLines[0]
      .replace(/([0-9]\]).*/,'$1')
      .trim()
      .replace(']', '');
    const story = nodeLines[0].split('(')[1].replace(')', '');
    const update = nodeLines
      .find(line => line.includes('Date:'))
      .split(':')[1]
      .trim();

    dispatch({
      type: SET_VERSION_INFO,
      data: { version, story, update }
    });
  } catch (err) {
    console.error(err);
  }
};