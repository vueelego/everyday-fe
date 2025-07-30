import ClipboardJS from 'clipboard'

/**
 * 通用复制文本函数
 * @param text 要复制的文本
 * @param onSuccess 成功回调函数
 * @param onError 失败回调函数
 */
export default function copyText(text: string, onSuccess?: () => void, onError?: (e: any) => void) {
  const btnClassName = 'clipboardjs_copy_btn'
  let fakeBtn = document.querySelector(`.${btnClassName}`) as HTMLButtonElement
  if (!fakeBtn) {
    fakeBtn = document.createElement('button')
    fakeBtn.style.position = 'absolute'
    fakeBtn.style.left = '-9999px'
    fakeBtn.style.zIndex = '-1'
    fakeBtn.classList.add(btnClassName)
    document.body.appendChild(fakeBtn)
  }

  fakeBtn.setAttribute('data-clipboard-text', text)
  const clipboard = new ClipboardJS(fakeBtn)

  clipboard.on('success', () => {
    onSuccess?.()
    clipboard.destroy()
  })

  clipboard.on('error', e => {
    onError?.(e)
    clipboard.destroy()
  })

  fakeBtn.click()
}
