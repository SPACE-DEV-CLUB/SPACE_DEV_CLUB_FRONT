import { MutableRefObject } from "react";

const toolBarCodeBox = (
  txtAreaCont: MutableRefObject<any>,
  startPoint: number,
  endPoint: number
) => {
  const checker = /\*\*([\w\W ]*)\*\*/;
  const checked =
    txtAreaCont.current.value.substring(startPoint, endPoint) || false;
  const beforeTxt = txtAreaCont.current.value.substring(startPoint, 0);
  const afterTxt = txtAreaCont.current.value.substring(endPoint);
  const draggedTxt = checker.exec(checked)
    ? checker.exec(checked)![1]
    : "\n```\n" +
      (txtAreaCont.current.value.substring(startPoint, endPoint) ||
        "코드를 입력하세요.") +
      "\n```\n";

  const result = beforeTxt + draggedTxt + afterTxt;
  return result;
};

export default toolBarCodeBox;
