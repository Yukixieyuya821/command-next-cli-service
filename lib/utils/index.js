const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const {commandConfigPath} = require('../config');

module.exports = {
    // 检查部署配置文件是否存在
    checkCommandConfigExists: () => fs.existsSync(commandConfigPath),
    // 日志信息
    log: message => {
        console.log(message);
    },
    // 成功信息
    succeed: (...message) => {
        ora().succeed(chalk.greenBright.bold(message));
    },
    // 提示信息
    info: (...message) => {
        ora().info(chalk.blueBright.bold(message));
    },
    // 错误信息
    error: (...message) => {
        ora().fail(chalk.redBright.bold(message));
    },
    // 下划线重点信息
    underline: message => chalk.underline.blueBright.bold(message)
};
