import Mock from 'mockjs'

import userApi from './mockData/user'
// import permissionApi from './mockData/permission'


Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)

// Mock.mock(/permission\/login/, 'get', permissionApi.loginFunc)
// Mock.mock(/permission\/logout/, 'get', permissionApi.logOut)