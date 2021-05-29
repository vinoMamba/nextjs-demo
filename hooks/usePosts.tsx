import {useEffect, useState} from "react";
import axios from "axios";

type Post = {
    id: string,
    date: string,
    title: string,
    content: string
}
export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/v1/posts").then(response => {
            setTimeout(() => {
                setPosts(response.data);
                if (response.data.length == 0) {
                    setIsEmpty(true);
                }
                setIsLoading(false);
            }, 3000);
        }, () => {
            setIsLoading(false);
        });
    }, []);
    return {posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty};
};
