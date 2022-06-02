
const path = require('path')
const fs = require('fs-extra')
// const spawn = require('cross-spawn')
const inquirer = require('inquirer')

module.exports = async function(name, options) {
  // 验证是否取到了值
  console.log(">>>>>>create.js", name, options)

  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(cwd, name)

  // 目录是否存在
  if (fs.existsSync(targetDir)) {
    // 是否强制创建
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // TODO：询问用户是否确定要覆盖
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: '覆盖',
              value: 'overwrite'
            },{
              name: '不覆盖',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetDir)
      }

      // // 定义需要安装的依赖
      // const dependencies = ['vue', 'vuex', 'vue-router', 'element-plus'];

      // // 执行安装
      // const child = spawn('npm', ['install', '-D'].concat(dependencies), {
      //   stdio: 'inherit'
      // })

      // // 监听结果
      // child.on('close', function(code) {
      //   // 执行失败
      //   if (code != 0) {
      //     console.log('Error occurred while installiing dependencies!');
      //     process.exit(1);
      //   } else {
      //     // 执行成功
      //     console.log('Install finished')
      //   }
      // })
    }
  }
}