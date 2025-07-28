// HandleFunc 事件委托(代理) 找到目标后执行的回调函数类型定义
type HandleFunc = (target: EventTarget | null, value?: string) => boolean

// DelegationEvent 事件委托(代理)类，封装事件委托复杂的处理过程，提供简便的方法
export default class DelegationEvent {
  private selector: string | HTMLElement // 委托元素的选择器 或者 委托DOM对象
  private delegation: HTMLElement | null // 委托的真实DOM对象
  private callback: HandleFunc // 找到目标函数后，执行的回调函数
  private matchName?: string // 匹配元素名称，也就是绑定attrName元素，就是绑定data-xxx元素

  // 属性名，例如: data-id，attrName=id；
  // 尽量绑定一个唯一值，通过唯一值查找需要的数据；或者绑定一个JSON String;而不是绑定多值
  private attrName?: string 

  constructor(selector: string, match: string, attr: string, callback: HandleFunc) {
    this.selector = selector
    this.matchName = match
    this.attrName = attr

    this.callback = callback

    this.delegation = null
    this._getDelegation()
  }

  private _getDelegation = () => {
    if (typeof this.selector === 'string') {
      this.delegation = document.querySelector(this.selector)
    } else {
      this.delegation = this.selector
    }
  }

  // _match 查找匹配data-xxx属性并返回，无则返回null
  private _match = (target: EventTarget | null) => {
    if (!target) {
      return null
    }

    let ele = target as Element

    if (this.matchName && this.attrName) {
      let attrVal = ele?.getAttribute('data-' + this.attrName)
      if (ele?.nodeName.toUpperCase() === this.matchName.toUpperCase() && attrVal != null) {
        return attrVal
      }
    }
    return null
  }

  // _handler 监听点击处理函数，采用箭头函数，保持调用方this正确
  private _handler = (event: MouseEvent) => {
    let target = event.target
    // 点击事件是冒泡的，当target==delegation表示查找完毕，停止while循环。
    while (target !== this.delegation) {
      if (this.matchName && this.attrName) {
        let attrVal = this._match(target)
        if (attrVal != null) {
          return this.callback(target, attrVal)
        }
      } else if (this.callback(target)) {
        // 自定义实现匹配
        break
      }

      // 检查target对象,防止无限循环
      if (!(target instanceof Element) || target === document.documentElement) {
        break
      }

      // 重新赋值，往上一级查找
      target = (target as Element).parentNode
    }
  }

  // addEvent 添加事件监听
  addEvent = () => {
    if (!this.delegation) {
      this._getDelegation()
    }

    if (!this.delegation) {
      throw new Error('请输入可委托的元素或CSS选择器(selector)')
    }

    this.delegation.addEventListener('click', this._handler)
  }

  // removeEvent 移除事件监听
  removeEvent = () => {
    this.delegation?.removeEventListener('click', this._handler)
  }
}
