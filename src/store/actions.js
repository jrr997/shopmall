import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })
      if (!oldProduct) {
        payload.count = 1
          // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车')
      } else {
        // oldProduct.count++
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      }
    })
  }
}