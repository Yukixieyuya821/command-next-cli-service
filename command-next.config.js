const path = require('path');

module.exports = {
    projectName: 'test-auto-git',
    cluster: [],
    dev: {
        name: '开发环境',
        mainTask: {
            name: 'heg-site-libs',
            script: [
                {
                    command: 'git clone -b master git@gitlab.hegdev.com:heg-site-v3/heg-site-libs.git',
                    description: '克隆项目',
                    type: 'clone'
                },
                {
                    command: 'yarn',
                    description: '执行安装依赖脚本',
                    cwd: path.resolve(process.cwd(), 'heg-site-libs')
                },
                {
                    command: 'yarn build',
                    description: '执行打包脚本',
                    cwd: path.resolve(process.cwd(), 'heg-site-libs')
                },
                // {
                //     command: `npm version ${process.env.VERSION_ENV}`,
                //     description: '更新版本号'
                // },
                // {
                //     command: 'npm publish --registry=http://nexus.hotel-ci.hegdev.com/nexus/repository/heg-npm-hosted/',
                //     description: '发布新版本'
                // },
                // {
                //     command: 'git push',
                //     description: '推送远程'
                // }
            ]
        },
        childTasklist: [
            {
                name: 'heg-site-main',
                script: [
                    // {
                    //     command: 'rimraf heg-site-main',
                    //     description: '删除文件夹',
                    //     type: 'delete'
                    // },
                    {
                        command: 'git clone -b master git@gitlab.hegdev.com:heg-site-v3/heg-site-main.git',
                        description: '克隆项目',
                        type: 'clone'
                    },
                    {
                        command: 'yarn',
                        description: '执行安装依赖脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-main')
                    },
                    {
                        command: 'yarn build:dev',
                        description: '执行打包脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-main')
                    }
                ],
            },
            {
                name: 'heg-site-flight',
                script: [
                    // {
                    //     command: 'rimraf heg-site-flight',
                    //     description: '删除文件夹',
                    //     type: 'delete'
                    // },
                    {
                        command: 'git clone -b master git@gitlab.hegdev.com:heg-site-v3/heg-site-flight.git',
                        description: '克隆项目',
                        type: 'clone'
                    },
                    {
                        command: 'yarn',
                        description: '执行安装依赖脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-flight')
                    },
                    {
                        command: 'yarn build:dev',
                        description: '执行打包脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-flight')
                    }
                ],
            },
            {
                name: 'heg-site-hotel',
                script: [
                    // {
                    //     command: 'rimraf heg-site-hotel',
                    //     description: '删除文件夹',
                    //     type: 'delete'
                    // },
                    {
                        command: 'git clone -b master git@gitlab.hegdev.com:heg-site-v3/heg-site-hotel.git',
                        description: '克隆项目',
                        type: 'clone'
                    },
                    {
                        command: 'yarn',
                        description: '执行安装依赖脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-hotel')
                    },
                    {
                        command: 'yarn build:dev',
                        description: '执行打包脚本',
                        cwd: path.resolve(process.cwd(), 'heg-site-hotel')
                    }
                ]
            }
        ]
    },
};

