import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import gyurimoji from "../../../public/image/gyuri_memoji.png";
import minjumoji from "../../../public/image/minju_memoji.png";
import hyunhomoji from "../../../public/image/hyunho_memoji.png";
import junghoonmoji from "../../../public/image/junghoon_memoji.png";
import seoyoungmoji from "../../../public/image/seoyoung_memoji.png";
import kymoji from "../../../public/image/ky_memoji.png";
import { GitHub, Home } from "@mui/icons-material";

function Members() {
    return (
        <MembersContainer>
            <h2>We&apos;re on the Next Level!</h2>{" "}
            <Member className="left">
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">김기영(DECLAN)</li>
                        <li>
                            <ul>
                                <li>
                                    &quot;사람이 보이는 것보다 더 실력이
                                    출중합니다 👀&quot;
                                </li>
                                <li>&quot;은둔고수&quot;</li>
                                <li>
                                    &quot;필요한 말을 필요할 떄 꼭 해주시는
                                    해결사&quot;
                                </li>
                                <li>&quot;컴퓨팅 사고방식&quot;</li>
                                <li></li>
                            </ul>
                        </li>
                        <li className="keyword">
                            <span>침착</span>
                            <span>분석</span>
                            <span>모험</span>
                        </li>
                        <li className="sns-wrap">
                            <a
                                className="sns-badge github kiyu"
                                href="https://github.com/kykim00"
                            >
                                <GitHub /> github
                            </a>
                            <a
                                className="sns-badge blog kiyu"
                                href="https://velog.io/@kykim"
                            >
                                <Home /> blog
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="image-wrap">
                    <Image alt="memoji" width={320} height={320} src={kymoji} />
                </div>
            </Member>
            <Member className="right">
            <div className="image-wrap">
                    <Image
                        alt="memoji"
                        width={320}
                        height={320}
                        src={minjumoji}
                    />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">김민주(DANA)</li>
                        <li>
                            <ul>
                                <li>
                                    &quot;본인의 능력을 남들과 나누는 멋진
                                    사람.&quot;
                                </li>
                                <li>&quot;척척박사&quot;</li>
                                <li>&quot;자바스크립트 마스터&quot;</li>
                                <li>&quot;나만의 스택오버플로우&quot;</li>
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
            </Member>
            <Member className="left">
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">박서영(ODDREE)</li>
                        <li>
                            <ul>
                                <li>
                                    &quot;뭐든지 척척 구현 해낸다. 그녀에게
                                    한계란?&quot;
                                </li>
                                <li>
                                    &quot;알아서 잘 깔끔하고 딱 센스있게
                                    ✨&quot;
                                </li>
                                <li>&quot;못하는게 없다&quot;</li>
                                <li>
                                    &quot;일단 구현 완료. 성장이 눈에 보이는
                                    사람.&quot;
                                </li>
                                <li></li>
                            </ul>
                        </li>
                        <li className="keyword">
                            <span>도전</span>
                            <span>창의</span>
                            <span>성장</span>
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
                        width={320}
                        height={320}
                        src={seoyoungmoji}
                    />
                </div>
            </Member>
            <Member className="right">
                <div className="image-wrap">
                    <Image
                        alt="memoji"
                        width={320}
                        height={320}
                        src={junghoonmoji}
                    />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">박정훈(MICHAEL)</li>
                        <li>
                            <ul>
                                <li>
                                    &quot;누군가 팀 문화를 물으면, 박정훈을
                                    보게하라 😎&quot;
                                </li>
                                <li>&quot;깃마스터&quot;</li>
                                <li>
                                    &quot;스데브의 아빠같은 존재. 든든한
                                    국밥같은 그.&quot;
                                </li>
                                <li>
                                    &quot;와해되는 팀은 절대 없도록 한다. 그가
                                    있는 한, 팀 분위기는 일단 합격.&quot;
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
            <Member className="left">
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">이규리(LENA)</li>
                        <li>
                            <ul>
                                <li>
                                    &quot;코딩이란 무엇인가. 규리님 그
                                    자체.&quot;
                                </li>
                                <li>&quot;번아웃이 뭐죠? 먹는건가요?&quot;</li>
                                <li>
                                    &quot;쓸까말까 고민하는 순간 규리님은 이미
                                    완성 🎉&quot;
                                </li>
                                <li>
                                    &quot;밥먹고 코딩하고 잠자고 코딩하고&quot;
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
                <div className="image-wrap">
                    <Image
                        alt="memoji"
                        width={320}
                        height={320}
                        src={gyurimoji}
                    />
                </div>
            </Member>
            <Member className="right">
                <div className="image-wrap">
                    <Image
                        alt="memoji"
                        width={320}
                        height={320}
                        src={hyunhomoji}
                    />
                </div>
                <div className="profile-wrap">
                    <ul>
                        <li className="profile-head">이현호(AYAAN)</li>
                        <li>
                            <ul>
                                <li>&quot;윈도우 마스터&quot;</li>
                                <li>
                                    &quot;블로깅 머신. 네가 눈 깜빡 할 사이 그는
                                    이미 작성했다.&quot;
                                </li>
                                <li>
                                    &quot;조선에 조선왕조실록이 있다면
                                    스데브에는 현호님 벨로그가 있다 ✍️&quot;
                                </li>
                                <li>
                                    &quot;현호님 사전에 &apos;오늘 하루는 안해도
                                    되겠지&apos;는 없다&quot;
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
        </MembersContainer>
    );
}

export default Members;
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
    box-sizing: border-box;
    &.left {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        padding-left: 3rem;
    }
    &.right {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        padding-right: 3rem;
    }
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
            background: #ed9b00;
            &:hover {
                background: #821de0;
            }
        }
        .blog.seoy {
            background: #0066ee;
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
            background: #a66d03;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.minj {
            background: #1e88e5;
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
            background: #9aba30;
            &:hover {
                background: #821de0;
            }
        }
        .blog.jung {
            background: #ff7068;
            &:hover {
                background: #0ab37a;
            }
        }
        .github.kiyu {
            background: #364659;
            &:hover {
                background: #821de0;
            }
        }
        .blog.kiyu {
            background: #bf9a54;
            &:hover {
                background: #0ab37a;
            }
        }
    }
`;
