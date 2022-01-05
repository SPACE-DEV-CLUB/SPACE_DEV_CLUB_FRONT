import styled from "@emotion/styled";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const FindPost = () => {
    return (
            <FindContainer>
              <p>총 <span>8925</span>개의 포스트를 찾았습니다.</p>
            </FindContainer>
    );
};

const FindContainer = styled.div`
padding: 18px 0 64px 0;
p {
    font-size: 18px;
}
span {
    font-weight: bold;
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
