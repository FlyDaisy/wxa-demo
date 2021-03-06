const UglifyjsPlugin = require('@wxa/plugin-uglifyjs');
const ReplacePlugin = require('@wxa/plugin-replace');
const CopyPlugin = require('@wxa/plugin-copy');
let prod = process.env.NODE_ENV === 'production';
const path = require('path');

const BindHijackPlugin = require('@wxa/plugin-bind-hijack');

// 环境变量
const envlist = {
    'WXA_ENV': process.env.NODE_ENV || 'development',
};


module.exports = {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    plugins: [
        new ReplacePlugin({
            list: envlist,
        }),
        new CopyPlugin({
            from: 'src/theme',
            to: 'theme',
        }),
        new UglifyjsPlugin({
            uglifyjsOptions: {
                // uglifyjs配置
            },
            ignore: ['node_modules'],
        }),
        // 拦截所有事件
        new BindHijackPlugin()
    ],
    use: [
        {
            test: /\.js$/,
            name: 'babel',
        },
        {
            test: /\.sass|\.scss/,
            name: 'sass',
        },
    ],
};

if (prod) {
    module.exports.plugins.push(new UglifyjsPlugin());
}
