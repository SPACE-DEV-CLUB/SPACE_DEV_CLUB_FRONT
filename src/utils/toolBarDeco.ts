import { MutableRefObject } from "react";

const toolBarDeco = (
  txtAreaCont: MutableRefObject<any>,
  startPoint: number,
  endPoint: number,
  firstMd: string,
  lastMd: string
) => {
  console.log("txtAreaCont", txtAreaCont);
  console.log("startPoint", startPoint);
  const checker = /\*\*([\w\W ]*)\*\*/;
  const checked =
    txtAreaCont.current.value.substring(startPoint, endPoint) || false;
  const beforeTxt = txtAreaCont.current.value.substring(startPoint, 0);
  const afterTxt = txtAreaCont.current.value.substring(endPoint);
  const draggedTxt = checker.exec(checked)
    ? checker.exec(checked)![1]
    : firstMd +
      (txtAreaCont.current.value.substring(startPoint, endPoint) || "텍스트") +
      lastMd;
  const result = beforeTxt + draggedTxt + afterTxt;
  return result;
};

export default toolBarDeco;
