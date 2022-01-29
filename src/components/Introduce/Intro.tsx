import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { Header } from "../Common/Header";
import gyurimoji from "../../../public/image/gyuri_memoji.png";
import minjumoji from "../../../public/image/minju_memoji.png";
import hyunhomoji from "../../../public/image/hyunho_memoji.png";
import junghoonmoji from "../../../public/image/junghoon_memoji.png";
import seoyoungmoji from "../../../public/image/seoyoung_memoji.png";
// import hyunhomoji from "../../../public/image/hyunho_memoji.png";
import { GitHub, Home } from "@mui/icons-material";

function Intro() {
    return (
        <Container>
            <Header username="" user />
            <HeaderContainer>
                <h1>
                    Hi! We Are <br />
                    🚀 Space Dev Club 🚀
                </h1>
            </HeaderContainer>
            <MembersContainer>
                <h2>Members</h2>
                <Member>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={374}
                            height={374}
                            src={gyurimoji}
                        />
                    </div>
                    <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">이규리(LENA)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;코딩이란 무엇인가. 규리님 그
                                        자체.&quot;
                                    </li>
                                    <li>
                                        &quot;번아웃이 뭐죠? 먹는건가요?&quot;
                                    </li>
                                    <li>
                                        &quot;쓸까말까 고민하는 순간 규리님은
                                        이미 완성 🎉&quot;
                                    </li>
                                    <li>
                                        &quot;밥먹고 코딩하고 잠자고
                                        코딩하고&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>유연함</span>
                                <span>성실함</span>
                                <span>호기심</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github gyur"
                                    href="https://github.com/jae04099"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog gyur"
                                    href="https://jae04099.tistory.com/"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                </Member>
                <Member>
                <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">박서영(ODDREE)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;뭐든지 척척 구현 해낸다. 그녀에게 한계란?&quot;
                                    </li>
                                    <li>
                                        &quot;알아서 잘 깔끔하고 딱 센스있게 ✨&quot;
                                    </li>
                                    <li>
                                        &quot;쓸까말까 고민하는 순간 규리님은
                                        이미 완성 🎉&quot;
                                    </li>
                                    <li>
                                        &quot;밥먹고 코딩하고 잠자고
                                        코딩하고&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>유연함</span>
                                <span>성실함</span>
                                <span>호기심</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github seoy"
                                    href="https://github.com/ongddree"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog seoy"
                                    href="https://velog.io/@ongddree"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={374}
                            height={374}
                            src={seoyoungmoji}
                        />
                    </div>
                </Member>
                <Member>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={374}
                            height={374}
                            src={hyunhomoji}
                        />
                    </div>
                    <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">이현호(AYAAN)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;윈도우 마스터&quot;
                                    </li>
                                    <li>
                                        &quot;블로깅 머신. 네가 눈 깜빡 할 사이 그는 이미 작성했다.&quot;
                                    </li>
                                    <li>
                                        &quot;조선에 조선왕조실록이 있다면 스데브에는 현호님 벨로그가 있다 ✍️&quot;
                                    </li>
                                    <li>
                                        &quot;현호님 사전에 &apos;오늘 하루는 안해도 되겠지&apos;는 없다&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>정리</span>
                                <span>몰입</span>
                                <span>유머</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github hyun"
                                    href="https://github.com/LEEHYUNHO2001"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog hyun"
                                    href="https://velog.io/@leehyunho2001"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                </Member>
                <Member>
                <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">김민주(DANA)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;본인의 능력을 남들과 나누는 멋진 사람.&quot;
                                    </li>
                                    <li>
                                        &quot;척척박사&quot;
                                    </li>
                                    <li>
                                        &quot;자바스크립트 마스터&quot;
                                    </li>
                                    <li>
                                        &quot;나만의 스택오버플로우&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>끈기</span>
                                <span>도전</span>
                                <span>비타민</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github minj"
                                    href="https://github.com/deli-ght"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog minj"
                                    href="https://velog.io/@deli-ght"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={374}
                            height={374}
                            src={minjumoji}
                        />
                    </div>
                </Member>
                <Member>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={374}
                            height={374}
                            src={junghoonmoji}
                        />
                    </div>
                    <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">박정훈(MICHAEL)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;누군가 팀 문화를 물으면, 박정훈을 보게하라 😎&quot;
                                    </li>
                                    <li>
                                        &quot;깃마스터&quot;
                                    </li>
                                    <li>
                                        &quot;스데브의 아빠같은 존재. 든든한 국밥같은 그.&quot;
                                    </li>
                                    <li>
                                        &quot;밥먹고 코딩하고 잠자고
                                        코딩하고&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>소통</span>
                                <span>도전</span>
                                <span>푸근함</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github jung"
                                    href="https://github.com/Junghoon-P"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog jung"
                                    href="https://dpark-log.tistory.com/"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                </Member>
                <Member>
                <div className="profile-wrap">
                        <ul>
                            <li className="profile-head">김기영(LENA)</li>
                            <li>
                                <ul>
                                    <li>
                                        &quot;사람이 보이는 것보다 더 실력이 출중합니다 👀&quot;
                                    </li>
                                    <li>
                                        &quot;은둔고수&quot;
                                    </li>
                                    <li>
                                        &quot;필요한 말을 필요할 떄 꼭 해주시는 해결사&quot;
                                    </li>
                                    <li>
                                        &quot;컴퓨팅 사고방식&quot;
                                    </li>
                                    <li></li>
                                </ul>
                            </li>
                            <li className="keyword">
                                <span>유연함</span>
                                <span>성실함</span>
                                <span>호기심</span>
                            </li>
                            <li className="sns-wrap">
                                <a
                                    className="sns-badge github kiyu"
                                    href="https://github.com/jae04099"
                                >
                                    <GitHub /> github
                                </a>
                                <a
                                    className="sns-badge blog kiyu"
                                    href="https://jae04099.tistory.com/"
                                >
                                    <Home /> blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="image-wrap">
                        <Image
                            alt="memoji"
                            width={364}
                            height={374}
                            src={gyurimoji}
                        />
                    </div>
                </Member>
            </MembersContainer>
            <HistoryContainer>
                <h2>History</h2>
                <GraphWrap>
                    <History>
                        <div className="wrapper">
                            <span>🎉</span>
                            <p>축 Space Dev Club 오픈!</p>
                        </div>
                        <div className="dot_line">⋮</div>
                        <div className="wrapper">
                            <span>💻</span>
                            <p>클론코딩 시작! 총 4개의 웹사이트 클론</p>
                        </div>
                        <div className="dot_line">⋮</div>
                        <div className="wrapper">
                            <span>🙍</span>
                            <p>민주, 현호 합류!</p>
                        </div>
                        <div className="dot_line">⋮</div>
                        <div className="wrapper">
                            <span>🏠</span>
                            <p>본격 블로그 프로젝트 시작~</p>
                        </div>
                        <div className="dot_line">⋮</div>
                        <h2>We&apos;re on the Next Level!</h2>
                    </History>
                </GraphWrap>
            </HistoryContainer>
        </Container>
    );
}

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
        margin: 3rem 0 5rem 0;
    }
`;
const Member = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    .profile-wrap {
        .profile-head {
            font-weight: 600;
            font-size: 24px;
        }
        > ul {
            > li {
                font-size: 18px;
                line-height: 1.7;
                margin-bottom: 15px;
            }
        }
        .keyword {
            color: pink;
            span {
                margin-right: 15px;
                padding: 5px 10px;
                border: 1px solid pink;
            }
        }
    }
    .image-wrap {
    }

    .sns-wrap {
        margin-top: 20px;
        .sns-badge {
            width: 100%;
            padding: 5px 10px 10px 10px;
            margin-right: 10px;
            border-radius: 15px;
            color: white;
        }
        a > svg {
            vertical-align: calc(-15%);
        }
        .github.gyur {
            background: #7d13e0;
            &:hover {
                background: #1de05e;
            }
        }
        .blog.gyur {
            background: #e6a10c;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.seoy {
            background: #ED9B00;
            &:hover {
                background: #821de0;
            }
        }
        .blog.seoy {
            background: #0066EE;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.hyun {
            background: #beac74;
            &:hover {
                background: #821de0;
            }
        }
        .blog.hyun {
            background: #A66D03;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.minj {
            background: #1E88E5;
            &:hover {
                background: #821de0;
            }
        }
        .blog.minj {
            background: #795548;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.jung {
            background: #9ABA30;
            &:hover {
                background: #821de0;
            }
        }
        .blog.jung {
            background: #FF7068;
            &:hover {
                background: #0ab37a;
            }
        }
        .github {
            background: #7119c4;
            &:hover {
                background: #821de0;
            }
        }
        .blog {
            background: #089666;
            &:hover {
                background: #0ab37a;
            }
        }
    }
`;

const HistoryContainer = styled.section`
    width: 100%;
    background: #ee7752;
    padding: 3rem 0;
    h2 {
        text-align: center;
        font-size: 3rem;
        margin: 3rem 0 5rem 0;
        color: #fff;
    }
`;

const GraphWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const History = styled.article`
    display: flex;
    flex-direction: column;
    .wrapper {
        display: flex;
        margin-top: 20px;
    }
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        text-align: center;
        vertical-align: center;
        font-size: 50px;
        margin-right: 30px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    p {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        vertical-align: center;
        color: #444;
        font-weight: 600;
        background: #fff;
        border-radius: 10px;
        padding: 10px;
        min-width: 500px;
        font-size: 24px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        line-height: 1.5;
    }
    .dot_line {
        font-size: 64px;
        text-align: center;
        margin-left: 5rem;
        margin: 1rem 0 0 5rem;
    }
`;
