/// <reference types="next" />
/// <reference types="next/types/global" />
import * as next from "next";
import {Session} from "next-iron-session";

declare module "*.png" {
    const value: any;
    export default value;
}
type UsersErrors = {
    username: string[];
    password: string[];
    passwordConfirmation: string[];
}

type SignInErrors = {
    username: string[];
    password: string[];
}
declare module "next" {
    interface NextApiRequest {
        session: Session
    }
}