import styled from "@emotion/styled";
import React, { ChangeEvent, HTMLAttributeAnchorTarget, useContext, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ThemeContext } from "../../pages/_app";
import { Lock } from "@mui/icons-material";
import { ThemeProps } from "../../types/Theme";
import axios from "axios";
import { useRouter } from "next/router"
import { API_ENDPOINT } from "../../constants";
import Link from "next/link";

interface Session {
    session: {
        user: {
            email: string
            image: string
    }
    }
}

function SignUp(){
    const { data: session, status } = useSession();
    const { theme } = useContext(ThemeContext);
    const [nickName, setNickName] = useState(session?.user?.name);
    const [email, setEmail] = useState(session?.user?.email);
    const [userId, setUserId] = useState("");
    const [lineIntro, setLineIntro] = useState("");
    const router = useRouter();
    const handleSubmit = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        axios
            .post(`${API_ENDPOINT}/userinfos`, {
                    data: {
                        email: email,
                        nickname: nickName,
                        profilename: userId,
                        profile: lineIntro,
                        profileimage: session?.user?.image
                    },
            })
            .then((res) => {
                console.log(res);
                router.push(
                    '/'
                  )
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleGoBack = async (e:React.MouseEvent<HTMLElement>) => {
        await signOut()
        router.push('/')
    }
    return (
        <SignUpWrap theme={theme}>
            <h1>환영합니다!</h1>
            <h3>기본 회원 정보를 등록해주세요.</h3>
            <form>
                <label htmlFor="name">이름</label>
                <input
                    id="name"
                    onChange={(e: any) => setNickName(e.target.value)}
                ></input>
                <label htmlFor="email">이메일</label>
                <input
                    type="text"
                    className="fixed-value"
                    id="email"
                    disabled
                    value={session?.user?.email as string}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label htmlFor="userId">아이디</label>
                <input
                    id="userId"
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                ></input>
                <label htmlFor="intro">한 줄 소개</label>
                <input
                    id="intro"
                    onChange={(e) => setLineIntro(e.target.value)}
                    placeholder="당신을 한 줄로 소개해보세요"
                ></input>
                <ButtonWrap theme={theme}>
                        <button className="cancel" onClick={handleGoBack}>
                        취소
                    </button>
                    <button
                        className="nextpage"
                        onClick={handleSubmit}
                        type="button"
                    >
                        다음
                    </button>
                </ButtonWrap>
            </form>
            <LockIcon />
        </SignUpWrap>
    );
}

export default SignUp;

// 아이디 이미 존재하는 아이디 입니다.
// 이메일은 수정 불가. 그냥 구글에서 가져와야함.

const SignUpWrap = styled.div<ThemeProps>`
    display: flex;
    flex-direction: column;
    margin: 100px 256px 0 256px;
    h1 {
        font-size: 64px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    h3 {
        font-size: 24px;
        font-weight: 400;
    }
    form {
        display: inline-flex;
        flex-direction: column;
        margin: 48px 0;
        label {
            margin: 24px 0;
        }
        input {
            position: relative;
            border-top: none;
            border-left: none;
            border-right: none;
            background: transparent;
            color: ${({ theme }) => theme.SUB_FONT};
            height: 38px;
            font-size: 24px;
            ::placeholder,
            ::-webkit-input-placeholder {
                font-size: 24px;
            }
            &:focus {
                outline: none;
            }
        }
    }
`;
const ButtonWrap = styled.div<ThemeProps>`
    font-size: 24px;
    margin-top: 96px;
    .cancel {
        color: ${({ theme }) => theme.MAIN_FONT};
        padding: 10px 32px;
        border-radius: 24px;
        background: ${({ theme }) => theme.SUBBACKGROUND};
        font-size: 24px;
        cursor: pointer;
    }
    .nextpage {
        color: #131313;
        padding: 10px 32px;
        margin-left: 16px;
        border-radius: 24px;
        font-size: 24px;
        background: ${({ theme }) => theme.SUB};
        cursor: pointer;
    }
`;

const LockIcon = styled(Lock)`
    position: absolute;
    top: 430px;
    right: 270px;
`;
