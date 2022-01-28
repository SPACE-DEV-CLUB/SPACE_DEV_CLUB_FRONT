import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { Header } from "../../components/Common/Header";
import gyurimoji from "../../../public/image/gyuri_memoji.png"

function Intro() {
    return (
        <Container>
            <Header username="" user />
            <HeaderContainer>
                <h1>
                    Hi! We Are <br />
                    Space Dev Club
                </h1>
            </HeaderContainer>
            <MembersContainer>
                <h2>Members</h2>
             <Member>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 </Member>   
             <Member>
             <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                 </Member>   
             <Member>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 </Member>   
             <Member>
             <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                 </Member>   
             <Member>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 </Member>   
             <Member>
             <div className="profile-wrap">
                    <ul>
                        <li>NAME: 이규리(LENA)</li>
                        <li>FEEDBACK: 내 이름은 이규리 거꾸로 해도 이규리</li>
                        <li>KEYWORD: 근면, 성실, 귀여움</li>
                        <li>CONTACT: github</li>
                    </ul>
                </div>
                 <div className="image-wrap">
                     <Image alt="memoji" width={364} height={374} src={gyurimoji} />
                </div>
                 </Member>   
            </MembersContainer>
        </Container>
    );
};

export default Intro;

const Container = styled.div``;
const gradient = keyframes`
    0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
const HeaderContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 700px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: ${gradient} 15s ease infinite;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    h1 {
        font-size: 5rem;
        text-align: center;
        color: beige;
    }
`;

const MembersContainer = styled.section`
padding: 3rem;
h2 {
text-align: center;
font-size: 3rem;
}`;
const Member = styled.section`
display: flex;
align-items: center;
justify-content: space-around;
.profile-wrap{
    ul{
        li {
            font-size: 1.5rem;
            line-height: 1.5;
        }
    }
}
.image-wrap {

}
`