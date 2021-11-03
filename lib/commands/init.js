const fs = require('fs');
const childProcess = require('child_process');
const inquirer = require('inquirer');
const {
    checkCommandConfigExists,
    succeed,
    error,
    underline
} = require('../utils');
const {inquirerConfig, commandConfigPath} = require('../config');

// 获取用户输入信息
const getUserInputInfo = () => inquirer.prompt(inquirerConfig);
// 创建JSON对象
const createJsonObj = userInputInfo => {
    const jsonObj = {
        projectName: userInputInfo.projectName,
        cluster: []
    };
    const {commandEnvList} = userInputInfo;
    const createEnvConfigScript = env => {
        const commands = [];
        commands.push({
            command: userInputInfo[`${env}Install`],
            description: '执行安装依赖脚本'
        });
        commands.push({
            command: userInputInfo[`${env}Build`],
            description: '执行打包脚本'
        });
        return commands;
    };
    const createEnvConfigChildScript = env => {
        const commands = [];
        commands.push({
            command: userInputInfo[`${env}ChildInstall`],
            description: '执行子任务安装依赖脚本'
        });
        commands.push({
            command: userInputInfo[`${env}ChildBuild`],
            description: '执行子任务打包脚本'
        });
        return commands;
    };
    const createObj = env => ({
        name: userInputInfo[`${env}Name`],
        mainTask: {
            name: userInputInfo[`${env}MainTaskName`],
            script: createEnvConfigScript(env)
        },
        childTasklist: [
            {
                name: userInputInfo[`${env}ChildTaskName`],
                script: createEnvConfigChildScript(env)
            }
        ]
    });

    commandEnvList.forEach(item => (jsonObj[item] = createObj(item)));

    return jsonObj;
};


// 创建配置文件
const createConfigFile = jsonObj => {
    const str = `module.exports = ${JSON.stringify(jsonObj, null, 2)}`;
    fs.writeFileSync(commandConfigPath, str);
};

// 格式化配置文件
const formatConfigFile = () => {
    childProcess.execSync(`npx prettier --write ${commandConfigPath}`);
};
module.exports = {
    description: '初始化项目',
    apply: () => {
        if(checkCommandConfigExists()) {
            error('command-next.config.js 配置文件已存在');
            process.exit(1);
        } else
            getUserInputInfo().then(userInputInfo => {
                createConfigFile(createJsonObj(userInputInfo));
                formatConfigFile();
                succeed(
                    `配置文件生成成功，请查看项目目录下的 ${underline(
                        'command-next.config.js'
                    )} 文件确认配置是否正确`
                );
                process.exit(0);
            });
    }
};
