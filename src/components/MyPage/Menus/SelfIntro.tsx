import styled from "@emotion/styled"
import {
  useRef,
  useState,
  forwardRef,
  RefObject,
  MutableRefObject,
  useEffect,
} from "react"
import Image from "next/image"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "@constants/index"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"
import Cookies from "js-cookie"
import Loading from "@src/components/Common/Loading"
import { Editor as EditorType } from "@toast-ui/react-editor"
import { MDviewer } from "@src/components/Editor/EditorViewer"
import dynamic from "next/dynamic"
import axios from "axios"
import React from "react"
import { useRouter } from "next/router"
import qs from "qs"
import { useData } from "@src/hooks/useData"
import Error from "next/error"
import { useSWRConfig } from "swr"

interface EditorPropsType {
  initialValue: string
  usageStatistics: boolean
  placeholder: string
  ref: MutableRefObject<any>
  onChange: () => void
  hideModeSwitch: boolean
  toolbarItems: string[]
  theme: string
  previewStyle: string
}

const Editor = dynamic(() => import("./WrappedEditor"), { ssr: false })
// eslint-disable-next-line react/display-name
const EditorWithForwardedRef = React.forwardRef<EditorType, EditorPropsType>(
  (props, ref) => (
    <Editor {...props} forwardedRef={ref as RefObject<EditorType>} />
  ),
)

export const SelfIntro = () => {
  const [mode, setMode] = useState(true)
  const [value, setValue] = useState("")
  const { theme } = useContext(ThemeContext)
  const editorRef = useRef<any>(null)
  const router = useRouter()
  const id = router.query.id

  const query = qs.stringify({
    filters: {
      userid: {
        $eq: id,
      },
    },
  })

  const { data, error } = useData("userinfos", query)

  useEffect(() => {
    if (data) {
      setValue(data.data[0].attributes.aboutme)
    }
  }, [data])

  if (!data) return <Loading />
  if (error) return <div>에러 발생</div>

  const { userid, aboutme } = data.data[0].attributes

  const userCookieData = Cookies.get("user")
  if (!userCookieData) return <Loading />
  // 에러 처리
  const userInfo = JSON.parse(userCookieData)
  const loginUserid = userInfo.attributes.userid

  const handleEdit = () => {
    setMode(!mode)
  }

  const handleChange = () => {
    setValue(editorRef.current.getInstance().getMarkdown())
  }

  const updateAboutme = () => {
    axios
      .put(`${API_ENDPOINT}/userinfos/${data.data[0].id}`, {
        data: {
          aboutme: value,
        },
      })
      .then(function (res) {
        handleEdit()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <EditorContainer>
      {/* 데이터가 있다면 소개글 보여주기 */}
      {mode ? (
        aboutme ? (
          <>
            {userid === loginUserid && (
              <EditBtnBox>
                <EditBtn theme={theme} onClick={handleEdit}>
                  수정하기
                </EditBtn>
              </EditBtnBox>
            )}
            <MDContainer>
              <MDviewer contents={value} title={""} />
            </MDContainer>
          </>
        ) : (
          <>
            <DefaultContainer>
              <Image
                src="/image/mypage_selfintro.jpg"
                alt="self_default"
                width={300}
                height={300}
              />
              <h3>소개 글이 없어요</h3>
              {userid === loginUserid && (
                <EditBtn theme={theme} onClick={handleEdit}>
                  소개 글 작성하기
                </EditBtn>
              )}
            </DefaultContainer>
          </>
        )
      ) : (
        <>
          {userid === loginUserid && (
            <EditBtnBox>
              <EditBtn theme={theme} onClick={updateAboutme}>
                저장하기
              </EditBtn>
            </EditBtnBox>
          )}
          <MDContainer>
            <EditorWithForwardedRef
              initialValue={value}
              usageStatistics={false}
              placeholder={"무엇이든 입력해보세요!"}
              ref={editorRef}
              onChange={handleChange}
              hideModeSwitch={true}
              toolbarItems={[]}
              theme={theme.TYPE}
              previewStyle={"vertical"}
            ></EditorWithForwardedRef>
          </MDContainer>
        </>
      )}
    </EditorContainer>
  )
}

const EditorContainer = styled.section`
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0 16px;
  }
`

const EditBtnBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`

const EditBtn = styled.button<ThemeProps>`
  height: 40px;
  margin: 30px;
  padding: 0 18px;
  background: ${({ theme }) => theme.MAIN};
  color: ${({ theme }) => theme.BACKGROUND};
  border-radius: 4px;
`
const DefaultContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MDContainer = styled.section`
  width: 100%;
  max-width: 768px;
  margin-bottom: 70px;

  .toastui-editor-defaultUI {
    border: none;
  }

  .toastui-editor-toolbar,
  .toastui-editor-md-preview,
  .toastui-editor-main
    .toastui-editor-md-vertical-style
    .toastui-editor-md-splitter {
    display: none;
  }

  .toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor {
    width: 100%;
  }
`
