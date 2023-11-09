import request from '@/utils/request'

// 获取所有的department 的数据
export function list(query) {
  return request({
    url: '/api/department/tree',
    method: 'get',
    params: query
  })
}

export function createDepartment(data) {
  return request({
    url: '/api/department/create',
    method: 'post',
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: '/api/department/delete',
    method: 'post',
    params
  })
}
