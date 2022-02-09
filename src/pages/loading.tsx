import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Common/Loading";
import {
    useSession,
} from "next-auth/react";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";

export interface IUser {
    isUser: boolean;
}
const loading: NextPage = () => {
    const [isUser, setUser] = useState<IUser | undefined | any>("1");
    const router = useRouter();
    const { data: session, status } = useSession();
    const { data, error } = useSWR(
        "https://secret-hollows-17182.herokuapp.com/api/userinfos",
        fetcher
    );

    useEffect(() => {
        if (session) {
            if (
                data?.data.filter((e: any) =>
                    e.attributes.email?.includes(session.user?.email)
                ).length == 1
            ) {
                setUser(true);
            } else if (
                data?.data.filter((e: any) =>
                    e.attributes.email?.includes(session.user?.email)
                ).length == 0
            ) {
                setUser(false);
            }
            checkOurUser();
        }
    });

    const checkOurUser = () => {
        if (isUser === false) {
            router.push("/signup");
        } else if (isUser === true) {
            router.push("/");
        }
    };
    return <Loading />;
};

export default loading;
