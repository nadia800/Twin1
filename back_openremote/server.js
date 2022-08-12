//Managing Environment Variables in Node.js 
const dotenv = require("dotenv");
const http = require("http");


dotenv.config({ path: "./config.env" });
const app = require("./index");
const server = http.createServer(app);
var bcrypt = require("bcryptjs");

const db = require("./src/models/index");
const Role = db.role;
const web_master = db.web_master;

//force = true => to drop the oldest table
db.sequelize.sync({ force: false }).then(() => {
    //initial()
    //created('master', '12345678')
    console.log('Resync Db');
});


function created(username, secret) {
    web_master.findOne({
        where: {
            username: username
        }
    })
        .then(webMaster => {
            if (!webMaster) {
                web_master.create({
                    username: username,
                    secret: bcrypt.hashSync(secret, 8),
                    roles_id: 0
                })
                    .then(webMaster => {
                        console.log(webMaster)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                console.log("UserName exist deja!")
            }
        })
}
function initial() {
    Role.create({
        id: 0,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: true,
        add_User: true
    });

    Role.create({
        id: 1,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: false,
        add_User: true
    });

    Role.create({
        id: 2,
        add_insights: true,
        modify_insights: true,
        access_backend: true,
        add_project: false,
        add_User: false,
    });

    Role.create({
        id: 3,
        add_insights: false,
        modify_insights: false,
        access_backend: true,
        add_project: false,
        add_User: false,
    });
}


const port = process.env.PORT;

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
 });