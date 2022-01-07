import styled from "@emotion/styled";
import Image from "next/image";
import SAMPLE_IMG from "../../../public/image/sample.jpeg";
import { MEDIA_QUERY_END_POINT } from "../../constants";

interface IProfile {
    thumbnail: string;
    id: string;
    props: string;
}

export const Profile = ({ id }: {id:string}) => {
    return (
        <ProfileContainer>
            <div className="img-wrap">
                <Image
                    alt="thumbnail"
                    width={100}
                    height={100}
                    src={SAMPLE_IMG}
                ></Image>
            </div>
            <span className="id">{id}</span>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.section`
    display: flex;
    margin-bottom: 24px;
    align-items: center;
    vertical-align: center;
    .img-wrap {
        width: 48px;
        height: 48px;
        background: #333;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 16px;
    }
    span {
        font-size: 14px;
        font-weight: bold;
        color: #000;
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        .img-wrap {
            width: 32px;
            height: 32px;
        }
    }
`;