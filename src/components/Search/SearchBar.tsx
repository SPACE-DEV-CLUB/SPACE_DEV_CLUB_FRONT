import styled from "@emotion/styled";
import Search from "@mui/icons-material/Search";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const SearchBar = () => {
    return (
rContainer>
            <form>
                <div className="img-wrap">
                    <Search />
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
        display: flex;
        align-items: center;
        border: 1px solid rgb(173, 181, 189);
        padding: 0 24px;
        height: 64px;
        &:focus,  &:active {
            border: 1px solid rgb(123, 129, 136);
        }
    }
    input {
       width: 90%;
       margin-left: 20px;
       height: 32px;
       border: none;
       font-size: 28px;
       color: rgb(73, 80, 87);
       &:active, &:focus{
           outline: none;
       }
       &::placeholder {
           color: rgb(173, 181, 189);
       }
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        margin-bottom: 24px;
        form {
            display: flex;
            align-items: center;
            height: 34px;
            padding: 0 16px;
        }
        input {
            height: 16px;
            font-size: 18px;
            margin-left: 14px;
            vertical-align: center;
        }
  }
`; 