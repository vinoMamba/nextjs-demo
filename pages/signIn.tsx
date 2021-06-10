import {GetServerSideProps, NextPage} from "next";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
    console.log(props.user);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: [],
        password: [],
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
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
    }, [formData]);
    return (
        <>
            {props.user && <div>
                当前登录用户为：{props.user.username}
            </div>}
            <h1>登录</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        用户名
                        <input type="text" value={formData.username}
                               onChange={e => setFormData({
                                   ...formData,
                                   username: e.target.value
                               })}/>
                    </label>
                    {/*errors.username && errors.username.length > 0*/}
                    {errors.username?.length > 0 ? <span>{errors.username.join(",")}</span> : null}
                </div>
                <div>
                    <label>
                        密码
                        <input type="password" value={formData.password}
                               onChange={e => setFormData({
                                   ...formData,
                                   password: e.target.value
                               })}
                        />
                    </label>
                    {errors.password?.length > 0 ? <span>{errors.password.join(",")}</span> : null}
                </div>
                <div>
                    <button type="submit">登录</button>
                </div>
            </form>
        </>
    );
};
export default SignIn;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser");
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
});



