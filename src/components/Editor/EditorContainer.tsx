import styled from "@emotion/styled";
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  WriteHeader,
  WriteForm,
  BottomMenu,
} from "@components/Editor/EditorInput";
import { MDviewer } from "@components/Editor/EditorViewer";
import { SubmitModal } from "@components/Editor/SubmitModal";
import { MEDIA_QUERY_END_POINT, API_ENDPOINT } from "@src/constants";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";
import toolBarDeco from "@src/utils/toolBarDeco";
import toolBarChkBtn from "@src/utils/toolBarChkBtn";
import toolBarCodeBox from "@src/utils/toolBarCodeBox";
import axios from "axios";
import Cookies from "js-cookie";

export const EditorContainer = () => {
  const [tagInput, setTagInput] = useState("");
  //state data for POST down below
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [linkModal, setLinkModal] = useState(false);
  const txtAreaCont = useRef<any>("");
  const [listTagDatas, setListTagDatas] = useState<Array<string>>([]);
  //Modal state for POST down below
  const [infoPost, setInfoPost] = useState("");
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [imageSrc, setImageSrc] = useState<
    string | null | ArrayBuffer | undefined
  >("");
  const [writeUrl, setWriteUrl] = useState(title);
  const [isPrivate, setIsPrivate] = useState(false);
  const { theme } = useContext(ThemeContext);

  // useEffect(() => {
  //   let timer: any;
  //   if (submit) {
  //     setOpenSubmit(true);
  //   } else {
  //     timer = setTimeout(() => setOpenSubmit(false), 200);
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [submit]);

  const handleInfoPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoPost(e.target.value);
  };

  //control submit Modal options

  const handleImageUpload = (e: { currentTarget: { files: any[] } }) => {
    const fileBlob = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const removeThumbNail = () => {
    setImageSrc("");
  };

  //control tag & tag guide
  const handleTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentTagetValue = e.currentTarget.value;

    if (e.key === "Enter") {
      e.preventDefault();
      setTagInput("");
      if (checkOverlap(currentTagetValue)) {
        setListTagDatas([...listTagDatas, e.currentTarget.value]);
      }
    }
  };

  const checkOverlap = (currentValue: string) => {
    if (tagInput.length > 0) {
      return !listTagDatas.includes(currentValue);
    } else {
      return false;
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;

    setListTagDatas(
      listTagDatas.filter(
        (listTagData) => listTagData !== eventTarget.innerText
      )
    );
  };

  const handleBackSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      listTagDatas.pop();
      setListTagDatas([...listTagDatas]);
    }
  };

  //handle editor input element & tool bar
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  //알고리즘임
  // 1.클릭된 문자열 위치를 확인해서 (split or match) 몇번째줄인지 확인한다.
  // 2.해당 문자열 앞에 버튼에 맞는 selectedTag를 추가해준다. "#" + "n번째줄"
  // 3.해당 문자열을 다시 합쳐 (join?) setState에 넣어준다.
  // 4.버튼을 두번 누르면 아무일도 일어나지 않게 막는다.
  // 5.커서가 없으면 마지막줄에 바로 들어간다.
  const handleLineStyle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnElement = e.target as HTMLElement;
    const selectedTag = btnElement.innerText;
    const textSplit = txtAreaCont.current.value.split("\n");
    const textLengthArray: any[] = [];
    textSplit.forEach((i: string) => {
      textLengthArray.push(i.length as any);
    });
    let endPoint = txtAreaCont.current.selectionEnd;
    let checkLine = 0;

    for (let i = 0; i < textSplit.length; i++) {
      endPoint -= textLengthArray[i];
      if (endPoint <= 0 || endPoint === 1) {
        checkLine = i;
        break;
      } else if (endPoint > 0) {
        checkLine = textSplit.length - 1;
      }
    }

    const result = toolBarChkBtn(selectedTag, textSplit, checkLine);
    setContents(result);
  };

  // 중복효과 고려
  // deco Toobar 목표 기능
  // draggedLength === 0; 이고 첫 클릭 시 **텍스트**이 추가된다. (문자열 중간에도 들어간다.)
  // 두번째 클릭시 "텍스트"만 남는다.
  // draggedLength > 0; 드래그된 택스트 앞뒤에 ** 이 붙는다.
  // 두번째 클릭하면 드래그된 택스트 앞뒤에 **만 사라진다.
  const handleDecoBtn = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    const startPoint = txtAreaCont.current.selectionStart;
    const endPoint = txtAreaCont.current.selectionEnd;
    if (type === "bold") {
      const result = toolBarDeco(txtAreaCont, startPoint, endPoint, "**", "**");
      setContents(result);
    } else if (type === "italic") {
      const result = toolBarDeco(txtAreaCont, startPoint, endPoint, " _", "_ ");
      setContents(result);
    } else if (type === "cross") {
      const result = toolBarDeco(txtAreaCont, startPoint, endPoint, "~~", "~~");
      setContents(result);
    }
  };

  // 1. 그냥 클릭시 백틱3개와 코드를 입력하세요가 나온다.
  // 2. 드래그시 해당 부분의 텍스트를 백틱이 감싼다. 여기서 오류가 있다. 줄 중간을 드래그 하면 MDviewer가 오류남.(실제 벨로그 오류)
  // 3. 드래그시 해당 부분이 아닌 해당 줄들을 백틱이 감싸게 개선한다.
  //4. 두번 누르면 코드 친게 지워지도록 - 벨로그랑 비교해서 개선 사항

  const handleCodeBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const startPoint = txtAreaCont.current.selectionStart;
    const endPoint = txtAreaCont.current.selectionEnd;
    const result = toolBarCodeBox(txtAreaCont, startPoint, endPoint);
    setContents(result);
  };

  const handleLinkModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLinkModal(!linkModal);
  };

  //submitModal
  const handleSubmitModal = () => {
    setSubmit(!submit);
    let replaceUrl = title.replace(/ /g, "-");
    setWriteUrl(replaceUrl);
    setInfoPost(contents);
  };

  const hadlePublicState = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected = e.target as HTMLElement;
    const selectedBtn = selected.innerText;

    if (selectedBtn === "전체 공개") {
      setIsPrivate(false);
    } else if (selectedBtn === "비공개") {
      setIsPrivate(true);
    }
  };

  const userCookieData = Cookies.get("user");
  const submitCookieData = userCookieData && JSON.parse(userCookieData!);

  const write = (
    postTitle: string,
    postContents: string,
    postUrl: string,
    postPublicStatus: Boolean,
    postDescription: string
  ) => {
    axios
      .post(`${API_ENDPOINT}/posts`, {
        data: {
          title: postTitle,
          contents: postContents,
          url: postUrl,
          private: postPublicStatus,
          description: postDescription,
          hastags: listTagDatas,
          userid: submitCookieData,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          document.location.href = "/";
        }
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let submitUrl = writeUrl.replace(/ /g, "-");
    if (title.length === 0) {
      alert("제목을 입력하세요.");
    } else if (contents.length === 0) {
      alert("본문을 입력하세요.");
    } else {
      write(title, contents, submitUrl, isPrivate, infoPost);
    }
  };

  const handleUrlValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriteUrl(e.target.value);
  };

  return (
    <>
      <WriteSection>
        <EditorWrap>
          <EditorForm action="" theme={theme}>
            <WriteHeader
              handleTitleChange={handleTitleChange}
              title={title}
              handleTagEnter={handleTagEnter}
              handleInputValue={handleInputValue}
              handleBackSpace={handleBackSpace}
              onRemove={onRemove}
              tagInput={tagInput}
              listTagDatas={listTagDatas}
            />
            <WriteForm
              handleTextAreaChange={handleTextAreaChange}
              handleDecoBtn={handleDecoBtn}
              handleLineStyle={handleLineStyle}
              contents={contents}
              txtAreaCont={txtAreaCont}
              handleCodeBox={handleCodeBox}
              handleLinkModal={handleLinkModal}
              linkModal={linkModal}
            />
          </EditorForm>
          <BottomMenu handleSubmitModal={handleSubmitModal} />
        </EditorWrap>
        <MDWrap theme={theme}>
          <MDviewer title={title} contents={contents} />
          {/* props로 항상 state가 넘어가야 해서 Ref를 넘겨줄 수 없다. */}
        </MDWrap>
      </WriteSection>
      {submit && (
        <SubmitModal
          handleInfoPostChange={handleInfoPostChange}
          infoPostLength={infoPost.length}
          handleSubmitModal={handleSubmitModal}
          imageSrc={imageSrc}
          handleImageUpload={handleImageUpload}
          removeThumbNail={removeThumbNail}
          handleSubmit={handleSubmit}
          handleUrlValue={handleUrlValue}
          hadlePublicState={hadlePublicState}
          writeUrl={writeUrl}
          infoPost={infoPost}
        />
      )}
    </>
  );
};

const WriteSection = styled.section``;

const EditorWrap = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
  height: 100%;
  background-color: #fff;

  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    width: 100%;
    right: 0;
  }
`;

const EditorForm = styled.form<ThemeProps>`
  height: 100%;
  background: ${({ theme }) => theme.BACKGROUND};
`;

const MDWrap = styled.article<ThemeProps>`
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  padding: 48px;
  word-break: break-all;
  background: ${({ theme }) => theme.BACKGROUND};

  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
`;
