import { request } from "@/utils/request";
//获取所有商品类型
export function getAllCategory() {
  return request({
    url: "/commodity/common/category/getAll",
    method: "get"
  });
}

//根据分类id获取商品模板
export function getTemplateByid(id) {
  return request({
    url: "/commodity/template/getTemplateBy/categoryId/" + id,
    method: "get"
  });
}

//获取所有商品信息列表
export function getProviderItems(params) {
  return request({
    url: `/commodity/item/getProviderItems/${params.page}/${params.size}`,
    method: "get"
  });
}

//添加商品
export function addMyItem(data) {
  return request({
    url: "commodity/item/addMyItem",
    method: "post",
    data: data
  });
}
//删除商品
export function deleteItem(id) {
  return request({
    url: "commodity/item/deleteItem/" + id,
    method: "delete"
  });
}
//获取商品sup
export function getCommonSpuList(params) {
  return request({
    url: "commodity/common/getCommonSpuList",
    method: "get",
    params
  });
}
//获取商品sku
export function getCommonSkuList(spuid, params) {
  return request({
    url: "commodity/common/getCommonSkuList/" + spuid,
    method: "get",
    params
  });
}

//获取单个商品sku的信息
export function getCommonSku(spkid) {
  return request({
    url: "commodity/common/getCommonSku/" + spkid,
    method: "get"
  });
}
