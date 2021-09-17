const glob = require("glob");
const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
// 路由自动生成库 https://www.npmjs.com/package/vue-route-generator
const { generateRoutes } = require("vue-route-generator");
// 路由组件父目录名
const pagePathName = "pages";

// 匹配多页目录，返回多页的map结构
const getEntries = (globPath, options) => {
  let entries = {};
  glob.sync(globPath, options).forEach((entry) => {
    let basename = path.basename(entry);
    entries[basename] = {
      entry: `${entry}main.js`,
      template: `${entry}index.html`,
      filename: `${basename}.html`,
    };

    const route = generateRoutes({
      pages: `${entry}/${pagePathName}`,
      importPrefix: `./${pagePathName}/`,
      chunkNamePrefix: "router-",
    });
    fs.writeFileSync(`${entry}/routes.js`, route);
  });

  // 自动生成的routes.js不符合eslint规范，需要执行格式化
  shell.exec("npx eslint --fix src/views/*/routes.js");

  return entries;
};

module.exports = {
  pages: getEntries("src/views/*/"),
};
