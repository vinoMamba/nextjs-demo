import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios, {AxiosResponse} from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";
import {useForm} from "../hooks/useForm";

const SignIn: NextPage<{ user: User }> = (props) => {
        const onSubmit = (formData: typeof initFormData) => {
            axios.post(
                `/api/v1/sessions`,
                formData
            ).then((response) => {
                window.alert("登录成功");
            }, error => {
                const response: AxiosResponse = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data);
                }
            });
        };
        const initFormData = {
            username: "",
            password: "",
        };
        const {form, setErrors} = useForm({
            initFormData,
            fields: [
                {label: "用户名", type: "text", key: "username"},
                {label: "密码", type: "password", key: "password"},
            ],
            buttons: <button type="submit">提交</button>,
            onSubmit
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
        const user = context.req.session.get("currentUser") || "";
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        };
    }
);



