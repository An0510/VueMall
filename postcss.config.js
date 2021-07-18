module.exports = {
    plugins: {
        'autoprefixer': {

        },
        'postcss-pxtorem': {
            rootValue: 37.5, //vant-UI的官方根字体大小是37.5
            propList: ['*']
        }
    }
}

