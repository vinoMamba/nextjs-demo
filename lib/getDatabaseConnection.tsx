import {createConnection, getConnectionManager} from "typeorm";
import config from "ormconfig.json";
import {Post} from "src/entity/Post";
import {User} from "src/entity/User";
import {Review} from "src/entity/Review";

const create = async () => {
    // @ts-ignore
    return createConnection({
        ...config,
        entities: [Post, User, Review]
    });
};

export const getDatabaseConnection = async () => {
    const connectionManager = getConnectionManager();
    const defaultManager = connectionManager.has("default") && connectionManager.get("default");
    if (defaultManager) await defaultManager.close();
    return create();
};