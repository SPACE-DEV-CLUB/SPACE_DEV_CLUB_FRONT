import toolBarCheckLine from "./toolBarCheckLine";

const toolBarChkBtn = (
  selectedTag: string,
  textSplit: Array<string>,
  checkLine: number
) => {
  if (selectedTag === "H1" || selectedTag === "1") {
    const result = toolBarCheckLine(textSplit, checkLine, "# ");
    return result;
  } else if (selectedTag === "H2" || selectedTag === "2") {
    const result = toolBarCheckLine(textSplit, checkLine, "## ");
    return result;
  } else if (selectedTag === "H3" || selectedTag === "3") {
    const result = toolBarCheckLine(textSplit, checkLine, "### ");
    return result;
  } else if (selectedTag === "H4" || selectedTag === "4") {
    const result = toolBarCheckLine(textSplit, checkLine, "#### ");
    return result;
  } else {
    const result = toolBarCheckLine(textSplit, checkLine, ">");
    return result;
  }
};

export default toolBarChkBtn;
