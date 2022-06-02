#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log('langxue-cli working~')


const inquirer = require('inquirer')
// const chalk = require('chalk')
const figlet = require('figlet');


inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'langxue-cli' // 默认值
  }
]).then(answers => {
  // 打印互用输入结果
  console.log(answers)
})



const program = require('commander')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    // console.log('name:',name,'options:',options)

    // 文本样式
    console.log("project name is " + name)

    // 颜色
    // console.log("project name is " + chalk.cyan(name))
    // console.log("project name is " + chalk.green(name))

    // // 背景色
    // console.log("project name is " + chalk.bgRed(name))

    // // 使用RGB颜色输出
    // console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
    // console.log("project name is " + chalk.hex('#049CDB').bold(name));
    // console.log("project name is " + chalk.bgHex('#049CDB').bold(name))

    require('../lib/create.js')(name, options)
  })
  
program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program
  // 监听 --help 执行
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('langxue', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`lx <command> --help`)} for detailed usage of given command\r\n`)
  })
  
// 解析用户执行命令传入参数
program.parse(process.argv);