import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from "gray-matter";
import marked from "marked";

const markdownDir = path.join(process.cwd(), "markdown");

export const getPosts = async () => {
    //process.cwd()  current word dir
    const fileNames = await fsPromise.readdir(markdownDir);
    const posts = fileNames.map(filename => {
        const fullPath = path.join(markdownDir, filename);
        const id = filename.replace(/\.md$/g, "");
        const text = fs.readFileSync(fullPath, "utf-8");
        const {content, data: {title, date}} = matter(text);
        return {
            id, title, date, content
        };
    });
    return posts;
};


export const getPost = async (id: string) => {
    const fullPath = path.join(markdownDir, id + ".md");
    const text = fs.readFileSync(fullPath, "utf-8");
    const {content, data: {title, date}} = matter(text);
    const htmlContent = marked(content);
    return JSON.parse(JSON.stringify({
        title, date, content, htmlContent
    }));
};