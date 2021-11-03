const fs = require('fs');
const path = require('path');
const devConfig = [
    {
        type: 'input',
        name: 'devName',
        message: '环境名称',
        default: '开发环境',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devMainTaskName',
        message: '主任务名称',
        default: 'mainTaskName',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devInstall',
        message: '安装依赖脚本',
        default: 'npm run install:dev',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devBuild',
        message: '打包脚本',
        default: 'npm run build:dev',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devChildTaskName',
        message: '子任务名称',
        default: 'childTaskName',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devChildInstall',
        message: '子任务安装依赖脚本',
        default: 'npm run install:dev',
        when: answers => answers.commandEnvList.includes('dev')
    },
    {
        type: 'input',
        name: 'devChildBuild',
        message: '子任务打包脚本',
        default: 'npm run build:dev',
        when: answers => answers.commandEnvList.includes('dev')
    }
];
const testConfig = [
    {
        type: 'input',
        name: 'testName',
        message: '环境名称',
        default: '开发环境',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testMainTaskName',
        message: '主任务名称',
        default: 'mainTaskName',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testInstall',
        message: '安装依赖脚本',
        default: 'npm run install:test',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testBuild',
        message: '打包脚本',
        default: 'npm run build:test',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testChildTaskName',
        message: '子任务名称',
        default: 'childTaskName',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testChildInstall',
        message: '子任务安装依赖脚本',
        default: 'npm run install:test',
        when: answers => answers.commandEnvList.includes('test')
    },
    {
        type: 'input',
        name: 'testChildBuild',
        message: '子任务打包脚本',
        default: 'npm run build:test',
        when: answers => answers.commandEnvList.includes('test')
    }
];
const prodConfig = [
    {
        type: 'input',
        name: 'prodName',
        message: '环境名称',
        default: '开发环境',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodMainTaskName',
        message: '主任务名称',
        default: 'mainTaskName',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodInstall',
        message: '安装依赖脚本',
        default: 'npm run install:prod',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodScript',
        message: '打包脚本',
        default: 'npm run build:prod',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodChildTaskName',
        message: '子任务名称',
        default: 'childTaskName',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodChildInstall',
        message: '子任务安装依赖脚本',
        default: 'npm run install:prod',
        when: answers => answers.commandEnvList.includes('prod')
    },
    {
        type: 'input',
        name: 'prodChildBuild',
        message: '子任务打包脚本',
        default: 'npm run build:prod',
        when: answers => answers.commandEnvList.includes('prod')
    }
];
module.exports = {
    packageInfo: require('../../../package.json'),
    commandConfigPath: `${path.join(process.cwd())}/command-next.config.js`,
    inquirerConfig: [
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称',
            default: fs.existsSync(`${path.join(process.cwd())}/package.json`)
                ? require(`${process.cwd()}/package.json`).name
                : ''
        },
        {
            type: 'checkbox',
            name: 'commandEnvList',
            message: '请选择需要执行的环境',
            choices: [
                {
                    name: 'dev',
                    checked: true
                },
                {
                    name: 'test'
                },
                {
                    name: 'prod'
                }
            ]
        },
        ...devConfig,
        ...testConfig,
        ...prodConfig
    ]
};
