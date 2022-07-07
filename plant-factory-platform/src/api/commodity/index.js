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
//添加spu
export function addSpu(data) {
  return request({
    url: "commodity/protected/addSpu",
    method: "post",
    data
  });
}
//获取未完成添加商品操作
export function getIncompleteAdding() {
  return request({
    url: "commodity/protected/getIncompleteAdding",
    method: "get"
  });
}
//删除未完成的商品
export function cancelAdding() {
  return request({
    url: "commodity/protected/cancelAdding",
    method: "delete"
  });
}

//上传商品图片
export function uploadSpuImages(data) {
  return request({
    url: "commodity/protected/uploadSpuImages/" + data.spuId,
    method: "post",
    data: data.image,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

//添加sku列表
export function addSkus(data) {
  return request({
    url: "commodity/protected/addSkus",
    method: "post",
    data
  });
}

//设置商品主图片
export function setMainImage(params) {
  return request({
    url: "commodity/protected/setMainImage" + "/" + params.spuId + "/" + params.imageIndex,
    method: "put",
    data: params
  });
}

//更新Spu中的部分信息
export function updataSpu(data) {
  return request({
    url: "commodity/protected/updateSpu",
    method: "put",
    data
  });
}

//根据spuid获取sku
export function getCommonSkuListByid(params) {
  return request({
    url: "commodity/common/getCommonSkuList/" + params,
    method: "get"
  });
}

//删除商品图片
export function deleteSpuImage(params) {
  return request({
    url: `commodity/protected/deleteSpuImage/${params.spuId}/${params.imageIndex}`,
    method: "delete"
  });
}

//更新Sku的部分信息
export function updateSkus(data) {
  return request({
    url: "commodity/protected/updateSkus",
    method: "put",
    data
  });
}
