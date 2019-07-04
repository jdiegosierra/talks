const environments = {
    "development": {
        "PORT": 3000,
        "HOST": "localhost",
        "BIGCHAINDB": {
            "HOST": "localhost",
            "PORT": 9984
        },
        "MONGODB": {
            "HOST": "localhost",
            "PORT": 27017,
            "DB_NAME": "blockchainService",
        }
    }
}

exports.config = function () {
    var node_env = process.env.NODE_ENV || 'development';
    return {...environments[node_env] };
};
