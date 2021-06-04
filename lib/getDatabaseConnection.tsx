import {createConnection, getConnectionManager} from "typeorm";
import config from 'ormconfig.json';
import {Post} from "src/entity/Post";
import {User} from "src/entity/User";
import {Review} from "src/entity/Review";

export const getDatabaseConnection = async () => {
    const connectionManager = getConnectionManager();
    if (connectionManager.has('default')) {
        const connection = connectionManager.get('default');
        await connection.close();
        // @ts-ignore
        return createConnection({
            ...config,
            entities: [Post, User, Review]
        });
    } else {
        console.log('eee');
        // @ts-ignore
        return createConnection({
            ...config,
            entities: [Post, User, Review]
        });
    }
};