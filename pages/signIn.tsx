import {NextPage} from "next";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";

const SignIn: NextPage = () => {
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
            {JSON.stringify(errors)}
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