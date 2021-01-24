module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'views': '@/views',
                'components': '@/components',
                'common': '@/common',
                'network': '@/network'
            }
        }
    }
}