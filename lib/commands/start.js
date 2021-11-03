const ora = require('ora');
const childProcess = require('child_process');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const {commandConfigPath} = require('../config');
// 当要发补丁版时可运行命令：npm version patch
// 当要发小版本时可运行命令：npm version minor
// 当要发大版本时可运行命令：npm version major

const {
    checkCommandConfigExists,
    log,
    succeed,
    error,
    underline
} = require('../utils');

const maxBuffer = 5000 * 1024;
// 检查环境是否正确
const checkEnvCorrect = (config, env) => {
    const keys = ['name', 'mainTask', 'childTasklist'];
  
    if(config)
        keys.forEach(key => {
            if(config[env][key] && key === 'childTasklist' && !Array.isArray(config[env].childTasklist)) {
                error(
                    `配置错误: ${underline(`${env}环境`)} ${underline(
                        `${key}属性`
                    )} 配置不正确`
                );
                process.exit(1);
            }
            if((!config[env][key] || config[env][key] === '/') && key !== 'childTasklist') {
                error(
                    `配置错误: ${underline(`${env}环境`)} ${underline(
                        `${key}属性`
                    )} 配置不正确`
                );
                process.exit(1);
            }
        });
    else {
        error('配置错误: 未指定部署环境或指定部署环境不存在');
        process.exit(1);
    }
};
// 是否确认部署
const confirmDeploy = message => inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirm',
        message
    }
]);


const executeScript = async(name, {command, description, cwd, beforeCallback, afterCallback, type}, number, index) => {
    let newCommand = command;
    let newCwd = cwd || process.cwd();
    let newdescription = description;
    if(type === 'clone' && fs.existsSync(path.resolve(process.cwd(), name))) {
        newCommand = 'git pull --rebase';
        newCwd = path.resolve(process.cwd(), name);
        newdescription = '拉取项目';
    }
    try {
        const newName = name ? `<${name}>` : '';
        const spinner = ora(`${number}.${index}、${newName}正在${newdescription}中\n`);
        spinner.start();
        if(typeof beforeCallback === 'function')
            await new Promise(beforeCallback);
        await new Promise((resolve, reject) => {
            childProcess.exec(
                newCommand,
                {cwd: newCwd,
                    maxBuffer},
                async e => {
                    spinner.stop();
                    if(e === null) {
                        succeed(`${number}.${index}、${newName}${newdescription}成功`);
                        if(typeof afterCallback === 'function')
                            await new Promise(afterCallback);
                        resolve();
                    } else
                        reject(e.message);
                }
            );
        });
    } catch(e) {
        error(`${index}、${newdescription}失败`);
        error(e);
        process.exit(1);
    }
};

const executeTaskList = async(taskList, number) => {
    const {name, script} = taskList;
    for(const [index, item] of new Map(
        script.map((item, index) => [index, item])
    ))
        await executeScript(name, item, number, index + 1);
};
module.exports = {
    description: '执行脚本',
    apply: async env => {
        if(checkCommandConfigExists()) {
            const config = require(commandConfigPath);
            const cluster = config.cluster;
            const projectName = config.projectName;
            const currentTime = new Date().getTime();
  
            const createdEnvConfig = env => {
                checkEnvCorrect(config, env);
  
                return Object.assign({}, config[env]);
            };
  
            if(env) {
                const envConfig = createdEnvConfig(env);
  
                // const answers = await confirmDeploy(
                // `${underline(projectName)} 项目是否在 ${underline(
                //     envConfig.name
                // )}执行脚本?`
                // );
  
                // if(answers.confirm) {
                //     await Promise.all(envConfig.tasklist.map((item, index) => executeTaskList(item, index + 1)));

                //     // await executeTaskList(envConfig.script);
  
                //     succeed(
                //         `恭喜您，${underline(projectName)}项目已在${underline(
                //             envConfig.name
                //         )}执行脚本成功 耗时${(new Date().getTime() - currentTime) / 1000}s\n`
                //     );
                //     process.exit(0);
                // } else
                //     process.exit(1);
                log(`${underline(projectName)} 项目正在 ${underline(
                    envConfig.name
                )}执行脚本.`);
                await executeTaskList(envConfig.mainTask, 0);
                await Promise.all(envConfig.childTasklist.map((item, index) => executeTaskList(item, index + 1)));

                succeed(
                    `恭喜您，${underline(projectName)}项目已在${underline(
                        envConfig.name
                    )}执行脚本成功 耗时${(new Date().getTime() - currentTime) / 1000}s\n`
                );
            } else if(cluster && cluster.length > 0) {
                const answers = await confirmDeploy(
                    `${underline(projectName)} 项目是否在 ${underline('集群环境')}执行脚本任务?`
                );
  
                if(answers.confirm) {
                    for(const env of cluster) {
                        const envConfig = createdEnvConfig(env);
  
                        await executeTaskList(envConfig.script);
  
                        succeed(
                            `恭喜您，${underline(projectName)}项目已在${underline(
                                envConfig.name
                            )}执行脚本成功`
                        );
                    }
  
                    succeed(
                        `恭喜您，${underline(projectName)}项目已在${underline(
                            '集群环境'
                        )}执行脚本成功 耗时${(new Date().getTime() - currentTime) / 1000}s\n`
                    );
                } else
                    process.exit(1);
            } else {
                error(
                    '请使用 command-next-cli-service -mode 指定执行环境或在配置文件中指定 cluster（集群）地址'
                );
                process.exit(1);
            }
        } else {
            error(
                'command-next.config.js 文件不存，请使用 command-next-cli-service init 命令创建'
            );
            process.exit(1);
        }
    }
};
