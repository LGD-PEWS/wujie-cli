// const path = require("path");
import path from "path";
// const fs = require("fs-extra");
import fs from "fs-extra";
import { input, confirm } from "@inquirer/prompts";
import { Generator } from "./Generator.js";

export async function create(name, options) {
  // console.log(">>> create.js", name, options);
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd();
  console.log("cwd", cwd);
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);
  console.log("targetAir", targetAir);

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      const action = await confirm({ message: "是否覆盖?" });
      if (!action) {
        return;
      } else if (action) {
        // 移除已存在的目录
        console.log(`\r\n覆盖中...`);
        await fs.remove(targetAir);
      }
    }
  }
  // 创建项目
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create();
}
