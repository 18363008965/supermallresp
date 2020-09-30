/*
* 商品详情网络请求封装
* */
import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

/*
* 将详情页中的数据封装到一个类中
* */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
