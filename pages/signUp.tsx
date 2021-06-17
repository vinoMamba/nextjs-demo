import {NextPage} from "next";
import axios, {AxiosResponse} from "axios";
import {useForm} from "../hooks/useForm";

const SignUp: NextPage = () => {
    const onSubmit = (formData: typeof initFormData) => {
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
    };
    const initFormData = {
        username: "",
        password: "",
        passwordConfirmation: ""
    };
    const {form, setErrors} = useForm({
        initFormData,
        fields: [
            {label: "用户名", type: "text", key: "username"},
            {label: "密码", type: "password", key: "password"},
            {label: "确认密码", type: "password", key: "passwordConfirmation"}
        ],
        buttons: <button type="submit">注册</button>,
        onSubmit
    });
    return (
        <>{form}</>
    );
};
export default SignUp;