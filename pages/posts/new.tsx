import {NextPage} from "next";
import {Form} from "../../components/Form";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useForm} from "../../hooks/useForm";

const PostsNew: NextPage = () => {
    const onSubmit = (formData: typeof initFormData) => {
        axios.post(`/api/v1/posts`, formData).then((response) => {
            window.alert("提交成功");
        }, error => {
            const response: AxiosResponse = error.response;
            if (response && response.status === 422) {
                setErrors(response.data);
            }
        });
    };
    const initFormData = {title: "", content: ""};
    const {form, setErrors} = useForm(
        {
            initFormData,
            fields: [
                {label: "标题", type: "text", key: "title"},
                {label: "内容", type: "textarea", key: "content"}],
            buttons: <button type="submit">登录</button>,
            onSubmit
        }
    );

    return (
        <div>
            {form}
        </div>
    );
};

export default PostsNew;
