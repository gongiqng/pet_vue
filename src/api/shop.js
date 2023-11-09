import request from '@/utils/request'

// 获取所有的department 的数据
export function registerShop(data) {
  return request({
    url: '/api/shop/register',
    method: 'post',
    data
  })
}
export function list(query) {
  return request({
    url: '/api/shop/list',
    method: 'get',
    params: query
  })
}
export function paginationList(params) {
  return request({
    url: '/api/shop/paginationList',
    method: 'post',
    params: params
  })
}
export function deleteShop(params) {
  return request({
    url: '/api/shop/delete',
    method: 'post',
    params
  })
}

export function updateShop(data) {
  return request({
    url: '/api/shop/update',
    method: 'post',
    data
  })
}
export function refuseShop(params) {
  return request({
    url: '/api/shop/auditFailure',
    method: 'post',
    params
  })
}
export function passShop(params) {
  return request({
    url: '/api/shop/successfulAudit',
    method: 'post',
    params
  })
}
export function paging(params) {
  return request({
    url: '/api/shop/paginationList',
    method: 'post',
    params: params
  })
}
