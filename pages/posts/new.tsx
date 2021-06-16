import {NextPage} from "next";
import {Form} from "../../components/Form";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";

const PostsNew: NextPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const onChange = useCallback((key, value) => {
        setFormData({...formData, [key]: value});
    }, [formData]);
    const [errors, setErrors] = useState({
        title: [],
        content: [],
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(
            `/api/v1/posts`,
            formData
        ).then((response) => {
            window.alert("提交成功");
        }, error => {
            const response: AxiosResponse = error.response;
            if (response && response.status === 422) {
                setErrors(response.data);
            }
        });
    }, [formData]);
    return (
        <>
            <Form
                fields={[
                    {
                        label: "标题",
                        type: "text",
                        value: formData.title,
                        onChange: e => onChange("username", e.target.value),
                        errors: errors.title
                    },
                    {
                        label: "内容",
                        type: "textarea",
                        value: formData.content,
                        onChange: e => onChange("password", e.target.value),
                        errors: errors.content
                    },
                ]}
                onSubmit={onSubmit}
                buttons={
                    <>
                        <button type="submit">登录</button>
                    </>
                }
            />
        </>
    );
};

export default PostsNew;
