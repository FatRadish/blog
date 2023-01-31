import config from "@/assets/js/config";
import { setToken } from '@/utils/auth/token'

import api from "@/api";


interface LoginInfo {
  username: string
  password: string
}
const formModel = ref<LoginInfo>({
  username: "",
  password: "",
});



export const useRegister = (appStore:any)=>{
  const rules = {}
  const registerFlag = computed({
    get: () => appStore.registerFlag,
    set: (val) => appStore.setRegisterFlag(val),
  });
  // 切换到登录页面
  function openLogin() {
    appStore.setRegisterFlag(false);
    appStore.setLoginFlag(true);
  }

  // 注册
  async function handleRegister() {
    const { username, password } = formModel.value;
    if (!username || !password) {
      window.$message?.warning("请输入用户名和密码");
      return;
    }
    // 腾讯滑块验证码 (在 index.html 中引入 js 文件)
    const captcha = new (window as any).TencentCaptcha(
      config.TENCENT_CAPTCHA,
      async (res: any) => {
        if (res.ret === 0) {
          // 注册
          await api.register(formModel.value);
          window.$notification?.success({ title: "注册成功!", duration: 1500 });
          formModel.value = { username: "", password: "" };
          // 打开登录弹窗
          openLogin();
        }
      }
    );
    captcha.show();
  }

  return {
    handleRegister,
    openLogin,
    formModel,
    rules,
    registerFlag
  }
}

export const useLogin = (appStore:any, userStore:any)=>{
  const rules = {};


  const loginFlag = computed({
    get: () => appStore.loginFlag,
    set: val => appStore.setLoginFlag(val)
  })
  const registerFlag = computed({
    get: () => appStore.registerFlag,
    set: (val) => appStore.setRegisterFlag(val),
  });


  //登录
  async function handleLogin() {
    const { username, password } = formModel.value

    if (!username || !password) {
      window.$message?.info('请输入用户名和密码')
      return
    }

    //腾讯滑块验证码（在index.html 中引入 js 文件）
    const captcha = new (window as any).TencentCaptcha(config.TENCENT_CAPTCHA, async (res: any) => {
      if (res.ret === 0) {
        //登录
        const res: any = await api.login(formModel.value)
        window.$notification?.success({ title: '登录成功！', duration: 1500 })
        setToken(res.data.token)
        //加载用户信息，更新pinia 中信息， 刷新页面
        await userStore.getUserInfo()
        //请空表单
        formModel.value = { username: '', password: '' }

        loginFlag.value = false
      }
    })

    captcha.show()
  }

  //立即注册
  function openRegister() {
    loginFlag.value = false
    registerFlag.value = true
  }

  //TODO :忘记密码
  function openForget() {
    window.$message?.info('在开发中')
  }

  return { 
    rules, 
    openRegister, 
    openForget, 
    handleLogin, 
    loginFlag,
    formModel
  }
}