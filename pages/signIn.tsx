import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";
import {useForm} from "../hooks/useForm";
import qs from "query-string";

const SignIn: NextPage<{ user: User }> = (props) => {
        const {form} = useForm({
            initFormData: {username: "", password: "",},
            fields: [
                {label: "用户名", type: "text", key: "username"},
                {label: "密码", type: "password", key: "password"},
            ],
            buttons: <button type="submit">提交</button>,
            submit: {
                request: formData => axios.post(`/api/v1/sessions`, formData),
                success: () => {
                    window.alert("登录成功");
                    const query = qs.parse(window.location.search);
                    window.location.href = query.returnTo!.toString();
                }
            }
        });
        return (
            <>{form}</>
        );
    }
;
export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
    async (context: GetServerSidePropsContext) => {
        // @ts-ignore
        const user = context.req.session.get("currentUser");
        return {
            props: {
                user: JSON.parse(JSON.stringify(user || ""))
            }
        };
    }
);



