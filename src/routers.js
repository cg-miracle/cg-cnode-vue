
var List=(resolve) => {
  require.ensure(['./page/artlist'],() =>{
    resolve(require('./page/artlist'));
  })
};

const routers=[{
  path:'/',
  name:'artlist',
  component: List
  },{//列表页
  path:'/list',
  name:'list',
  component: List
},{//文章详情
  path:'/article/:id',
  name:'article',
  component: (resolve) => {
    require.ensure(['./page/article'],() =>{
      resolve(require('./page/article'));
    })
  }
},{//个人中心
    path:'/user/:name',
    name:'userInfo',
    component: (resolve) => {
      require.ensure(['./page/user'],() =>{
        resolve(require('./page/user'));
      })
    }
  },{//登录页
    path:'/login',
    name:'login',
    component: (resolve) => {
      require.ensure(['./page/login'],() =>{
        resolve(require('./page/login'));
      })
    }
  }]

export default routers;
