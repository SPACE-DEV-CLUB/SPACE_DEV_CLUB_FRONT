const toolBarHTag = (lineArray: Array<string>, currentLine: number) => {
  if (currentLine === 0) {
    let addMd = lineArray.splice(currentLine, 1, "# " + lineArray[currentLine]);
    for (let i = 1; i < lineArray.length; i++) {
      let splitLine = lineArray.splice(i, 1, "\n" + lineArray[i]);
    }
  } else {
    let addMd = lineArray.splice(
      currentLine,
      1,
      "\n# " + lineArray[currentLine]
    );
    for (let i = 1; i < lineArray.length; i++) {
      if (i === currentLine) continue;
      let splitLine = lineArray.splice(i, 1, "\n" + lineArray[i]);
    }
  }
  let result = lineArray.join("");
  return result;
};

export default toolBarHTag;
