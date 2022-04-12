const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    menus: ["AuthSetting", "usersView", "rolesView", "menusView", "authView"],
    introduction: "I am a super administrator",
    name: "Super Admin",
  },
  "editor-token": {
    menus: ["editor"],
    introduction: "I am an editor",
    name: "Normal Editor",
  },
};

module.exports = [
  {
    url: "/user/login",
    type: "post",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];
      if (!token) {
        return {
          code: 60204,
          message: "用户名或密码错误",
        };
      }
      return {
        code: 200,
        data: token,
      };
    },
  },
  {
    url: "/user/info.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];
      if (!info) {
        return {
          code: 50008,
          message: "登录失败，无法获取用户详细信息",
        };
      }
      return {
        code: 200,
        data: info,
      };
    },
  },
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
];
