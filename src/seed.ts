import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
import {Review} from "./entity/Review";

createConnection().then(async connection => {
    const manager = connection.manager;
    const u1 = new User();
    u1.username = "vino";
    u1.password = "123456";
    await manager.save(u1);
    const p1 = new Post();
    p1.author = u1;
    p1.title = "湖人总冠军";
    p1.content = "嘻嘻嘻，湖人总冠军";
    await manager.save(p1);
    const r1 = new Review();
    r1.content = "太阳队加油，布克牛逼";
    r1.post = p1;
    r1.user = u1;
    await manager.save(r1);
    console.log('ok');
    await connection.close();

}).catch(error => console.log(error));
