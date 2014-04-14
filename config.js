var config = {
    development: {
        server: {
            port: 3000
        }
    },
    testing: {
        server: {
            port: 3001
        }
    },
    production: {
        server: {
            port: process.env.OPENSHIFT_NODEJS_PORT || 8080
        }
    }
};

module.exports = config[process.env.OPENSHIFT_NODEJS_IP || 'development'];

// self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;