import styled from "@emotion/styled";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useRef, useState } from "react";
import { HeaderMenu } from "./HeaderMenu";
import Link from "next/link";
import { css } from "@emotion/react";
import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import { ThemeProps } from "../../types/Theme";
import { signIn, useSession } from "next-auth/react";

import { MEDIA_QUERY_END_POINT } from "../../constants";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";

interface HeaderProps {
    username?: string | string[] | undefined;
    user: boolean;
}
export interface IUser {
    isUser: boolean;
}

export const Header = ({
    username = "",
    user = false,
}: HeaderProps): JSX.Element => {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const [check, setCheck] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [navTop, setNavTop] = useState(0);
    const [isUserName, setUserName] = useState(false);
    const { data, error } = useSWR(
        "https://secret-hollows-17182.herokuapp.com/api/userinfos",
        fetcher
    );
    const handleMenu = () => {
        setShowMenu(!showMenu);
    };
    const scrollTop = useRef(0);
    const lastscrollTop = useRef(0);
    const scrollNav = () => {
        scrollTop.current = window.scrollY;
        if (scrollTop.current > lastscrollTop.current) {
            setNavTop(-64);
            setShowMenu(false);
        } else {
            if (scrollTop.current <= 64) {
                setCheck(false);
            } else {
                setCheck(true);
            }
            setNavTop(0);
        }
        lastscrollTop.current = scrollTop.current;
    };

    const { data: session, status } = useSession();
    function detectUserName() {
        if (router.query.id) {
            return true;
        } else {
            return false;
        }
    };
    useEffect(() => {
        setUserName(detectUserName());
    });

    useEffect(() => {
        window.addEventListener("scroll", scrollNav);

        return () => {
            window.removeEventListener("scroll", scrollNav);
        };
    }, []);

    return (
        <HeaderComponent theme={theme} top={navTop} check={check}>
            <HeaderContainer>
                <HeaderUtils theme={theme}>
                    {isUserName ? (
                        <>
                            <LogoContainer href={`/`} passHref>
                                <LogoLink>
                                    <LogoImg
                                        width="192"
                                        height="192"
                                        viewBox="0 0 192 192"
                                        fill="none"
                                    >
                                        <rect
                                            width="192"
                                            height="192"
                                            fill="currentColor"
                                            rx="24"
                                        ></rect>
                                        <path
                                            d="M49 65.48V57.92C53.8 56.36 59.44 54.68 65.92 52.88C72.4 50.96 76.78 50 79.06 50C84.1 50 87.1 52.4 88.06 57.2L99.76 123.62C103.48 118.7 106.54 114.56 108.94 111.2C112.66 105.92 116.08 99.86 119.2 93.02C122.44 86.18 124.06 80.06 124.06 74.66C124.06 71.42 123.16 68.84 121.36 66.92C119.68 64.88 116.5 62.3 111.82 59.18C116.62 53.06 122.62 50 129.82 50C133.66 50 136.84 51.14 139.36 53.42C142 55.7 143.32 59.06 143.32 63.5C143.32 70.94 140.2 80.24 133.96 91.4C127.84 102.44 116.02 119.06 98.5 141.26L80.68 142.52L67 65.48H49Z"
                                            fill="white"
                                        ></path>
                                    </LogoImg>
                                </LogoLink>
                            </LogoContainer>
                            <LogoContainer href={`/${username}`} passHref>
                                <LogoLink>
                                    <UserName theme={theme}>
                                        {username}
                                    </UserName>
                                </LogoLink>
                            </LogoContainer>
                        </>
                    ) : (
                        <LogoContainer href={"/"} passHref>
                            <LogoLink>
                                <Image
                                    src={theme.LOGO}
                                    alt=""
                                    width={200}
                                    height={24}
                                ></Image>
                            </LogoLink>
                        </LogoContainer>
                    )}
                </HeaderUtils>
                <HeaderUtils theme={theme}>
                    {!session && (
                        <>
                            <button
                                className="login-btn"
                                onClick={(e: React.MouseEvent<HTMLElement>) =>
                                    signIn("google", {
                                        callbackUrl: "/loading",
                                    })
                                }
                            >
                                로그인
                            </button>
                            <SearchBtn
                                theme={theme}
                                className="sc-dxgOiQ ghkPCb"
                            >
                                <SearchIcon htmlColor={theme.MAIN_FONT} />
                            </SearchBtn>
                        </>
                    )}
                    {session && (
                        <>
                            <Link
                                href={
                                    user
                                        ? `/search?username=${username}`
                                        : "/search"
                                }
                                passHref
                            >
                                <SearchBtn
                                    theme={theme}
                                    className="sc-dxgOiQ ghkPCb"
                                >
                                    <SearchIcon htmlColor={theme.MAIN_FONT} />
                                </SearchBtn>
                            </Link>
                            <NewPostBtn theme={theme}>새 글 작성</NewPostBtn>
                            <UserUtils theme={theme} onClick={handleMenu}>
                                <UserProfile
                                    src={session?.user?.image as string}
                                    alt="userProfile"
                                    width={40}
                                    height={40}
                                    layout="fixed"
                                />
                                <ArrowDropDownIcon className="arrow" />
                                {showMenu && <HeaderMenu username={username} />}
                            </UserUtils>
                        </>
                    )}
                </HeaderUtils>
            </HeaderContainer>
        </HeaderComponent>
    );
};

type HeaderComponentProps = {
    top: number;
    theme: Theme;
    check: boolean;
};

const headerTop = ({ top, theme, check }: HeaderComponentProps) => css`
    background: ${theme.BACKGROUND};
    top: ${top}px;
    ${check && `box-shadow:  0 5px 10px 0 ${theme.TOGGLE_BACKGROUND}`};
`;

const HeaderComponent = styled.header`
    position: sticky;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    ${headerTop}
    transition : 0.1s linear;
`;

const HeaderContainer = styled.section`
    display: flex;
    width: 1728px;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    margin: 0 16px;
    flex-shrink: 2;

    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
        width: 1376px;
    }
    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
        width: 1024px;
    }
    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
        width: calc(100% - 32px);
    }
`;

const HeaderUtils = styled.article<ThemeProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.MAIN_FONT};
    & > *:not(:last-child) {
        margin-right: 12px;
    }
    .login-btn {
        color: ${({ theme }) => theme.MAIN_FONT};
        font-size: 16px;
    }
`;

const LogoContainer = styled(Link)``;

const LogoLink = styled.a`
    display: flex;
    align-items: center;
`;
const LogoImg = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const UserName = styled.a<ThemeProps>`
    font-family: "Fira Mono", monospace;
    max-width: calc(100vw - 200px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${({ theme }) => theme.MAIN_FONT};
`;
const SearchBtn = styled.a<ThemeProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:hover,
    &:focus {
        border-radius: 50%;
        background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    }
`;
const UserUtils = styled.article<ThemeProps>`
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    position: relative;
    align-items: center;
    svg:hover {
        fill: ${({ theme }) => theme.ICON};
    }
    .arrow {
        color: ${({ theme }) => theme.SUB};
        &:hover {
            color: ${({ theme }) => theme.MAIN};
        }
    }
`;

const UserProfile = styled(Image)`
    border-radius: 50%;
`;

const NewPostBtn = styled.button<ThemeProps>`
    height: 32px;
    padding: 1px 16px;
    border-radius: 16px;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    word-break: keep-all;
    background: ${({ theme }) => theme.BACKGROUND};
    border: 1px solid ${({ theme }) => theme.MAIN_FONT};
    color: ${({ theme }) => theme.MAIN_FONT};
    transition: all 0.125s ease-in 0s;
    &:hover,
    &:focus {
        color: ${({ theme }) => theme.BACKGROUND};
        background: ${({ theme }) => theme.MAIN_FONT};
    }
    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
        display: none;
    }
`;
