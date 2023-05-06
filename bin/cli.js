#! /usr/bin/env node

// import { input, confirm } from "@inquirer/prompts";

// const answers = {
//   moduleNameEN: await input({ message: "请输入模块名(英文)", default: "wujie" }),
//   moduleNameZH: await input({ message: "请输入模块名(中文)", default: "无界" }),
// //   allowEmail: await confirm({ message: "请输入模块名(中文)", default: "无界" }),
// };

// console.log(answers.moduleNameEN);

import { program } from "commander";
// 引入package数据
// const packageData = await import("../package.json", {
//   assert: { type: "json" },
// });

import { create } from "../lib/create.js";

program
  // 定义命令和参数
  .command("create <app-name>")
  .description("新建模块")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    create(name, options);
    // 执行该命令
    // 打印执行结果
    // console.log("name:", name, "options:", options);
  });

program
  // 配置版本号信息
  .version(`v1.0.0`)
  // .version(`v${packageData.default.version}`)
  // .version(`v${import('../package.json').version}`)
  .usage("<command> [option]");

// 解析用户执行命令传入参数
program.parse(process.argv);
