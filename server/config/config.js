const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'abhi123',
        DATABASE: 'mongodb://localhost:27017/moviesList'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}