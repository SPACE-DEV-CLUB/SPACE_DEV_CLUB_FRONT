import styled from "@emotion/styled";
import Image from "next/image";
import SearchImg from "../../../public/image/search.svg";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const SearchBar = () => {
    return (
        <BarContainer>
            <form>
                <div className="img-wrap">
                    <Image
                        width={20}
                        height={20}
                        src={SearchImg}
                        alt="search"
                    ></Image>
                </div>
                <input type="text" placeholder="검색어를 입력하세요"></input>
            </form>
        </BarContainer>
    );
};

const BarContainer = styled.div`
    width: 734px;
    margin: 0 auto;
    form {
        position: relative;
        display: flex;
        align-items: center;
        height: 64px;
        .img-wrap {
            position: absolute;
            left: 24px;
        }
        input {
            width: 100%;
            margin-left: 0px;
            height: 32px;
            border: 1px solid rgb(173, 181, 189);
            font-size: 24px;
            padding: 10px 64px;
            color: rgb(73, 80, 87);
            outline: none;
            transition: outline-color 1000ms;
            
            &:active,
            &:focus {
                outline: 1px solid #000;
            }
            &::placeholder {
                color: rgb(173, 181, 189);
            }
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
