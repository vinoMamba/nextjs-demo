type Post = {
    id: string,
    date: string,
    title: string,
    content: string,
    htmlContent: string
}
type UsersErrors = {
    username: string[];
    password: string[];
    passwordConfirmation: string[];
}
