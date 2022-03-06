import styled from "@emotion/styled";
import Search from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import { ThemeProps } from "../../types/Theme";

export const SearchBar = () => {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const queryHandler = (e: React.
        ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== ' '){
            setSearchQuery(e.target.value);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [inputRef]);

    useEffect(() => {
        if (router.isReady) {
            const timeOut = setTimeout(() => {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, q: searchQuery },
                });
            }, 300);
            return () => clearTimeout(timeOut);
        }
    }, [searchQuery]);

    return (
        <BarContainer theme={theme}>
            {router.query.username && (
                <span>{router.query.username}님이 작성한 포스트 검색</span>
            )}
            <form>
                <div className="img-wrap">
                    <Search className="search" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={queryHandler}
                    placeholder="검색어를 입력하세요"
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                ></input>
            </form>
        </BarContainer>
    );
};

const BarContainer = styled.div<ThemeProps>`
    width: 734px;
    margin: 50px auto 0 auto;
    span {
        display: block;
        margin-bottom: 10px;
    }
    form {
        position: relative;
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.POINT_FONT};
        transition: all 300ms;
        .img-wrap {
            position: absolute;
            left: 24px;
        }
        input {
            width: 100%;
            height: 32px;
            margin-left: 0px;
            border: none;
            font-size: 24px;
            padding: 10px 64px;
            color: ${({ theme }) => theme.MAIN_FONT};
            background: ${({ theme }) => theme.BACKGROUND};
            outline: 1px solid ${({ theme }) => theme.POINT_FONT};
            transition: inherit;
            &:focus {
                outline: 1px solid ${({ theme }) => theme.MAIN_FONT};
            }
        }
        &:focus-within {
            color: ${({ theme }) => theme.MAIN_FONT};
        }

        &::placeholder {
            color: ${({ theme }) => theme.BORDER};
        }
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        margin-bottom: 24px;
        width: 100%;
        form {
            display: flex;
            align-items: center;
            height: 34px;
            input {
                height: 16px;
                font-size: 18px;
                vertical-align: center;
            }
        }
    }
`;
