// 处理项目创建逻辑

import { getRepoList } from "./http.js";
import ora from "ora";
import select from "@inquirer/select";

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora("Loading unicorns").start();
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, refetch ...");
  }
}

export class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map((item) => ({ value: item.name }));
    console.log(repos);

    // 2）用户选择自己新下载的模板名称
    const repo = await select({
      message: "Select a package manager",
      choices: repos,
      //   choices: [
      //     {
      //       name: "npm",
      //       value: "npm",
      //       description: "npm is the most popular package manager",
      //     },
      //     {
      //       name: "yarn",
      //       value: "yarn",
      //       description: "yarn is an awesome package manager",
      //     },
      //     {
      //       name: "jspm",
      //       value: "jspm",
      //       disabled: true,
      //     },
      //     {
      //       name: "pnpm",
      //       value: "pnpm",
      //       disabled: "(pnpm is not available)",
      //     },
      //   ],
    });
    // const { repo } = await inquirer.prompt({
    //   name: "repo",
    //   type: "list",
    //   choices: repos,
    //   message: "Please choose a template to create project",
    // });

    // 3）return 用户选择的名称
    return repo;
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create() {
    // 1）获取模板名称
    const repo = await this.getRepo();

    console.log("用户选择了，repo=" + repo);
  }
}

// module.exports = Generator;
