// 用户相关的所有请求
import {  request } from "../../utils/request"
// 1. 用户数据获取




export const getUser = (params) => {
  return request.request({
      url: '/user/getUser',
      method: 'get',
      params
  })
}
export const addUser = (data) => {
  return request.request({
      url: '/user/add',
      method: 'post',
      data
  })
}

export const editUser = (data) => {
  return request.request({
      url: '/user/edit',
      method: 'post',
      data
  })
}

export const deleteUser = (data) => {
  return request.request({
      url: '/user/del',
      method: 'post',
      data
  })
}
