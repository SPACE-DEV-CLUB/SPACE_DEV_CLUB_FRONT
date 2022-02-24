import styled from "@emotion/styled";
import { useContext } from "react";
import { MEDIA_QUERY_END_POINT } from "../../../constants";
import { Button } from "@components/Common/Button";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";

interface SubmitModalProps {
  handleInfoPostChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  removeThumbNail: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleImageUpload: any;
  handleSubmitModal: React.MouseEventHandler<HTMLButtonElement>;
  infoPostLength: number;
  imageSrc: any;
}

export const SubmitModal = ({
  handleInfoPostChange,
  infoPostLength,
  handleSubmitModal,
  imageSrc,
  handleImageUpload,
  removeThumbNail,
}: SubmitModalProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SubmitContainer theme={theme}>
      <h3 className="sr-only">에디터 제출 모달</h3>
      <div>
        <ThumbNailWrap>
          <Title theme={theme}>포스트 미리보기</Title>
          {imageSrc && (
            <PreviewBtn>
              <button type="button">재업로드</button>
              <div />
              <button type="button" onClick={removeThumbNail}>
                제거
              </button>
            </PreviewBtn>
          )}
          <ImageUpload theme={theme}>
            <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
              <path
                fill="#868E96"
                d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
              ></path>
              <path
                fill="#868E96"
                d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
              ></path>
            </svg>
            <ThumbNailUpload theme={theme} htmlFor="input-file">
              썸네일 업로드
            </ThumbNailUpload>
            <input
              id="input-file"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <ThumbNailPreview>
              {imageSrc && <img src={imageSrc} alt="preview-img" />}
            </ThumbNailPreview>
          </ImageUpload>
          <InfoPost
            onChange={handleInfoPostChange}
            maxLength={150}
            placeholder="당신의 포스트를 짧게 소개해보세요."
            theme={theme}
          />
          <PostLength>
            <p>{infoPostLength}/150</p>
          </PostLength>
        </ThumbNailWrap>
        <BorderLineCol />
        <OptionContainer>
          <OptionWrap>
            <article>
              <Title theme={theme}>공개 설정</Title>
              <ButtonWrap>
                <ToggleBtn theme={theme} type="button">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.243 22.212a10.209 10.209 0 0 1-6.03-2.939A10.218 10.218 0 0 1 1.714 12c0-2.473.868-4.813 2.458-6.673.041.492.142 1.019.116 1.395-.094 1.373-.23 2.232.574 3.39.313.451.39 1.098.542 1.62.149.51.744.779 1.155 1.094.828.635 1.62 1.373 2.5 1.932.579.369.941.552.771 1.26-.136.569-.174.92-.469 1.426-.09.155.34 1.15.482 1.292.433.433.862.83 1.333 1.219.732.604-.07 1.389-.42 2.257zm8.516-2.939a10.213 10.213 0 0 1-5.34 2.832c.285-.705.793-1.331 1.264-1.694.409-.316.922-.924 1.136-1.405.213-.48.496-.898.783-1.34.407-.628-1.005-1.577-1.463-1.776-1.03-.447-1.805-1.05-2.72-1.694-.653-.46-1.977.24-2.713-.082-1.009-.44-1.84-1.206-2.716-1.866-.905-.68-.861-1.475-.861-2.48.708.026 1.716-.196 2.187.373.148.18.659.984 1 .698.28-.233-.207-1.168-.3-1.388-.29-.676.658-.94 1.142-1.398.632-.597 1.989-1.535 1.882-1.964-.108-.428-1.358-1.643-2.092-1.453-.11.028-1.078 1.044-1.266 1.203l.015-.994c.004-.21-.39-.424-.372-.56.046-.34.996-.96 1.232-1.232-.165-.103-.73-.588-.9-.517-.415.173-.882.291-1.296.464 0-.144-.017-.279-.038-.412a10.188 10.188 0 0 1 2.614-.758l.812.326.574.68.573.591.5.162.795-.75-.205-.535v-.481c1.572.228 3.057.814 4.357 1.719-.233.02-.488.055-.777.091-.119-.07-.272-.102-.401-.15.376.81.77 1.608 1.169 2.408.426.853 1.372 1.77 1.539 2.67.195 1.063.06 2.028.166 3.278.104 1.204 1.358 2.572 1.358 2.572s.579.197 1.06.128a10.222 10.222 0 0 1-2.698 4.734z"
                    ></path>
                  </svg>
                  <div>전체 공개</div>
                </ToggleBtn>
                <ToggleBtn theme={theme} type="button">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M17.625 9H16.5V6.81c0-2.47-1.969-4.522-4.44-4.56a4.514 4.514 0 0 0-4.56 4.5V9H6.375A1.88 1.88 0 0 0 4.5 10.875v9a1.88 1.88 0 0 0 1.875 1.875h11.25a1.88 1.88 0 0 0 1.875-1.875v-9A1.88 1.88 0 0 0 17.625 9zm-4.969 5.85v3.225a.672.672 0 0 1-.623.675.657.657 0 0 1-.69-.656V14.85a1.5 1.5 0 0 1-.838-1.486 1.5 1.5 0 1 1 2.152 1.486zM15.187 9H8.814V6.75c0-.848.332-1.645.937-2.25A3.16 3.16 0 0 1 12 3.562a3.16 3.16 0 0 1 2.25.938 3.16 3.16 0 0 1 .938 2.25V9z"
                    ></path>
                  </svg>
                  <div>비공개</div>
                </ToggleBtn>
              </ButtonWrap>
            </article>
            <SettingUrl>
              <Title theme={theme}>URL 설정</Title>
              <UrlInput theme={theme}>
                <div>`/@아이디/`</div>
                <input type="text" />
              </UrlInput>
            </SettingUrl>
            <SettingSeries theme={theme}>
              <Title theme={theme}>시리즈 설정</Title>
              <button type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>시리즈에 추가하기</span>
              </button>
            </SettingSeries>
          </OptionWrap>
          <SubmitWrap>
            <Button
              fontWeight={600}
              ftColor="#fff"
              bgColor={theme.BUTTON_SUB}
              type="button"
              handleBtn={handleSubmitModal}
            >
              취소
            </Button>
            <Button
              fontWeight={600}
              type="submit"
              ftColor="#fff"
              bgColor={theme.BUTTON_MAIN}
            >
              출간하기
            </Button>
          </SubmitWrap>
        </OptionContainer>
      </div>
    </SubmitContainer>
  );
};

const SubmitContainer = styled.section<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.TOGGLE_BACKGROUND};

  div {
    display: flex;
  }
`;

const Title = styled.h3<ThemeProps>`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.SUB_FONT};
  font-size: 21px;
  font-weight: 700;
`;

const ThumbNailWrap = styled.section`
  width: 350px;
  height: 193px;
`;

const ImageUpload = styled.article<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.BACKGROUND};
  box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
  overflow: hidden;
`;

const ThumbNailUpload = styled.label<ThemeProps>`
  margin-top: 16px;
  padding: 4px 32px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: ${({ theme }) => theme.MAIN};
  background-color: ${({ theme }) => theme.SUBBACKGROUND};
  transition: all 0.125s ease-in 0s;
  cursor: pointer;

  &:hover {
    filter: brightness(98%);
  }
`;

const ThumbNailPreview = styled.div`
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

const PreviewBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 8px;

  div {
    display: block;
    width: 2px;
    height: 2px;
    margin: 0 9px 0 8px;
    border-radius: 1px;
    background-color: #868e96;
  }

  button {
    font-size: 16px;
    text-decoration: underline;
    color: #868e96;
    font-weight: 400;

    &:hover {
      filter: brightness(95%);
    }
  }
`;

const InfoPost = styled.textarea<ThemeProps>`
  box-sizing: border-box;
  resize: none;
  width: 100%;
  height: 118px;
  margin-top: 32px;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
  color: ${({ theme }) => theme.MAIN_FONT};
  background-color: ${({ theme }) => theme.BACKGROUND};

  ::placeholder {
    color: #868e96;
  }
`;

const PostLength = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
  color: #868e96;
`;

const BorderLineCol = styled.div`
  width: 1px;
  min-height: 425px;
  background: #cfd5da;
  margin-left: 32px;
  margin-right: 32px;
`;

const OptionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const ToggleBtn = styled.button<ThemeProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
  border-radius: 4px;
  padding-left: 16px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;
  background-color: ${({ theme }) => theme.BACKGROUND};
  color: ${({ theme }) => theme.MAIN};
  font-size: 18px;
  font-weight: bold;

  &:last-child {
    margin-left: 16px;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.MAIN};
  }

  div {
    flex: 1 1 0%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const OptionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingUrl = styled.article`
  margin-top: 24px;
`;

const UrlInput = styled.div<ThemeProps>`
  display: flex;
  padding: 8px 14px;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.BACKGROUND};
  box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;

  div {
    color: #868e96;
  }

  input {
    flex: 1 1 0%;
    border: none;
    outline: none;
    margin-left: 3px;
    padding: 1px 0 0 0;
    line-height: 1.5;
    font-size: 16px;
    background: none;
    color: ${({ theme }) => theme.MAIN_FONT};
  }
`;

const SettingSeries = styled.article<ThemeProps>`
  margin-top: 24px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.MAIN};
    background-color: ${({ theme }) => theme.BACKGROUND};
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;

    span {
      margin-left: 14px;
    }
  }
`;

const SubmitWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
