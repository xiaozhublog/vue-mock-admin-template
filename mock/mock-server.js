const Mock = require("mockjs");
const chokidar = require("chokidar");
const bodyParser = require("body-parser");
const chalk = require("chalk"); //终端样式库
const path = require("path");
const mockDir = path.join(process.cwd(), "mock");

// 注册接口路由
function registerRoutes(app) {
  let mockLastIndex;
  const { mocks } = require("./index.js");
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}
// 删除对应的接口路由缓存
function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || "get",
    response(req, res) {
      console.log("request invoke:" + req.path);
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      );
    },
  };
};
module.exports = (middlewares, devServer) => {
  const app = devServer.app;
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const mockRoutes = registerRoutes(app);
  var mockRoutesLength = mockRoutes.mockRoutesLength;
  var mockStartIndex = mockRoutes.mockStartIndex;

  // 自动热更新
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      if (event === "change" || event === "add") {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          );
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
  return middlewares;
};
