import {NextPage} from "next";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Form} from "../components/Form";

const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirmation: ""
    });
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(
            `/api/v1/users`,
            formData
        ).then((response) => {
            window.alert("登录成功");
            window.location.href = "/signIn";
        }, error => {
            const response: AxiosResponse = error.response;
            if (response && response.status === 422) {
                setErrors(response.data);
            }
        });
    }, [formData]);
    const onChange = useCallback((key: string, value: string) => {
        setFormData({...formData, [key]: value});
    }, [formData]);
    return (
        <>
            <h1>注册</h1>
            <hr/>
            <Form
                onSubmit={onSubmit}
                fields={[
                    {
                        label: "用户名",
                        type: "text",
                        value: formData.username,
                        onChange: e => onChange("username", e.target.value),
                        errors: errors.username
                    },
                    {
                        label: "密码",
                        type: "password",
                        value: formData.password,
                        onChange: e => onChange("password", e.target.value),
                        errors: errors.password
                    },
                    {
                        label: "确认密码",
                        type: "password",
                        value: formData.passwordConfirmation,
                        onChange: e => onChange("passwordConfirmation", e.target.value),
                        errors: errors.passwordConfirmation
                    },
                ]}
                buttons={
                    <>
                        <button type="submit">注册</button>
                    </>
                }/>
        </>
    );
};
export default SignUp;