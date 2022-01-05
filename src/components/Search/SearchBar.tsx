import styled from "@emotion/styled";
import Image from "next/image";
import SearchImg from "../../../public/image/search.svg";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const SearchBar = () => {
    return (
            <BarContainer>
                <form>
                    <Image width={20} height={20} src={SearchImg} alt="search" ></Image>
                    <input type="text" placeholder="검색어를 입력하세요" />
                </form>
            </BarContainer>
    );
};

const BarContainer = styled.div`
    width: 734px;
    height: 64px;
    margin: 0 auto;
    
    form {
        border: 1px solid rgb(173, 181, 189);
        padding: 0 24px;
        &:focus,  &:active {
            border: 1px solid rgb(123, 129, 136);
        }
    }
    input {
       width: 95%;
       height: 62px;
       border: none;
       font-size: 28px;
       padding: 32px;
       color: rgb(173, 181, 189);
       &:active, &:focus{
           outline: none;
       }
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        padding: 0;
        form {
            display: flex;
            align-items: center;
        }
        input {
            height: 100%;
            font-size: 18px;
            padding: 10px;
            vertical-align: center;
        }
  }
`; 