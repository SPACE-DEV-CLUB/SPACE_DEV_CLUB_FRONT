import styled from "@emotion/styled";
import { useState, useRef, useContext, useEffect } from "react";
import { WriteHeader } from "./EditorInput/WriteHeader";
import { WriteForm } from "./EditorInput/WriteForm";
import { BottomMenu } from "./EditorInput/BottomMenu";
import { MDviewr } from "./EditorViewer/MDViewer";
import { SubmitModal } from "./SubmitModal/SubmitModal";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { ThemeContext } from "../../pages/_app";
import { ThemeProps } from "../../types/Theme";
export const EditorContainer = () => {
  const [tagInput, setTagInput] = useState("");
  //state data for POST down below
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const txtAreaCont = useRef("");
  const [listTagDatas, setListTagDatas] = useState<Array<string>>([]);
  //Modal state for POST down below
  const [infoPost, setInfoPost] = useState("");
  const [submit, setSubmit] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [imageSrc, setImageSrc] = useState<
    string | null | ArrayBuffer | undefined
  >("");

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

  const handleSubmitModal = () => {
    setSubmit(!submit);
  };

  const handleInfoPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoPost(e.target.value);
  };

  //control submit Modal options
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    txtAreaCont.current = e.target.value;
  };

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

  const handleHtag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hElemnt = e.target as HTMLElement;
    let hTag = hElemnt.innerText;
    if (hTag === "H1" || hTag === "1") {
      console.log("clcked h1");
    } else if (hTag === "H2" || hTag === "2") {
      console.log("clcked h2");
    } else if (hTag === "H3" || hTag === "3") {
      console.log("clcked h3");
    } else if (hTag === "H4" || hTag === "4") {
      console.log("clcked h4");
    }
  };
  console.log("contents", contents);
  1;
  // 클릭시 해당 줄에 #테그를 앞에 넣어준다.
  // 그리고 set
  // 클릭이 일어나면
  // md viewer의 해당 줄 앞에 # 추가
  // contents 에도 해당 줄 앞에 # 추가

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
              handleHtag={handleHtag}
              contents={contents}
            />
          </EditorForm>
          <BottomMenu handleSubmitModal={handleSubmitModal} />
        </EditorWrap>
        <MDWrap theme={theme}>
          <MDviewr title={title} contents={contents} />
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
