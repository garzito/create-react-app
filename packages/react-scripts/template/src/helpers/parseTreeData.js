export const arrangeIntoTree = files => {
  const tree = [];
  files.forEach(file => {
    const pathParts = file.path.split('/');
    let currentLevel = tree;

    pathParts.forEach((part, i) => {
      const existingPath = currentLevel.find(({ name }) => name === part);
      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        const newPart = {
          name: part,
          path: file.path,
          open: false,
          type: file.type
        };
        
        if (i === 0) {
          newPart.type = 'dir';
          newPart.path = "";
          newPart.children = [];
        }
        currentLevel.push(newPart);
        currentLevel = newPart.children;
       }
    });
  });
  return tree;
}

export const convertData = files => {
  const treeObj = {
    name: 'src',
    open: true,
    children: arrangeIntoTree(files)
  }

  return treeObj;
};