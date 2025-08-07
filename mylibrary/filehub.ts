// 文件相关操作
export default class FileHub {
  /**
   * 使用a标签下载文件，需要注意路径问题和跨域问题
   * 支持普通文件路径，如：/files/exp.pdf
   * Data URI base64,适合小文件，长度会被浏览器URI长度限制
   * 下载文件（如导出 CSV、生成图片）时，需要用blob:URL
   * 
   * @param fileUrl 文件路径，如果是图片、CSV、xlsx表格需要使用blob:URL，可以使用fileToBolbURL转换
   * @param filename 下载的文件名称，带后缀名，如：xxx.png
   */
  public static downloadFile(fileUrl: string, filename: string) {
    filename = fileUrl.split("/").pop() as string
    if (!filename.includes(".")) {
      throw new Error("传递的filename必须带后缀名称,请检查: " + filename)
    }

    const aLink = document.createElement('a')
    aLink.href = fileUrl
    aLink.target = "_blank"
    aLink.download = filename // NOTE: Safari对download 属性支持不完善
    document.body.appendChild(aLink)
    aLink.click()

    // 清理资源
    document.body.removeChild(aLink)
    if (fileUrl.startsWith("blob")) {
      window.URL.revokeObjectURL(fileUrl)
    }
  }

  /**
   * 把普通文件路径转换为 blob 对象
   * @param fileUrl 
   * @param filename 
   * @returns 
   */
  public static fileToBolbURL(fileUrl: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("get", fileUrl, true);
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.status === 200) {
          // resolve(URL.createObjectURL(xhr.response)) // blob:https://xxxxxx
          resolve(xhr.response)
        } else {
          reject(new Error("转换失败"))
        }
      };
      xhr.send();
    })
  }

  // 将input上传的file文件转换成formData
  public static fileToFormData(file: any, maxSize: number, fileKey = 'files', formData: FormData = new FormData()) {
    return new Promise((resolve, reject) => {
      // 校验文件大小, file.size 单位是字节，因此需要转换为kb
      if ((file.size / 1024) > maxSize) {
        const unitMB = Math.floor(maxSize / 1024)
        reject({ message: `文件大小超过${unitMB}M,请压缩后上传!`, type: "ErrFileTooLong" })
      }

      formData.append(fileKey, file) // NOTE: 这里最终类似{files: [file]}
      resolve(formData)
    })
  }

  /**
   * 把canvas保存为图片
   * @param canvas
   */
  public static saveWithCanvas(canvas: HTMLCanvasElement, filename: string) {
    FileHub.downloadFile(canvas.toDataURL(), filename)
  }
}

