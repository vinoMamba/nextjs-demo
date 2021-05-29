import {NextApiHandler} from "next";

const Posts: NextApiHandler = (request, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.write(JSON.stringify({name: "vino", age: 24}))
    response.end()
}
export default Posts