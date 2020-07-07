const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

function setToken(userId, token) {
    client.setex(userId, 3600, token, (err, data) => {
        console.log(err, data);
    });
}

function getToken(userId) {
    client.get(userId, function(err, data) {
        if(!err) {
            return data;
        }
    });
}

module.exports = {
    setToken,
    getToken
}