import request from '../../utils/request'
// 商品分类列表
export function getCommodityCategories() {
    return request({
        url:'/commodity/common/category/getAll',
        method:'get'
    })
}
// 获取单个商品分类列表
export function getCommonSpuList(params){
    return request({
        url:'/commodity/common/getCommonSpuList',
        method:'get',
        data:params
    })
}