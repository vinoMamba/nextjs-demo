import {NextPage} from "next";
import {Form} from "../../components/Form";

const PostsNew: NextPage = () => {
    return (
        <>
            <Form fields={[
                {label: "用户名", type: "text"},
                {label: "密码", type: "password"}
            ]}/>
        </>
    );
};

export default PostsNew;
