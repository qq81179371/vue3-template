<template>
  <div>
    <vue-tinymce v-model="content" :setting="setting" />
    <span style="color:#999; font-size:10px;">
      编辑器默认以iphone6尺寸进行编辑，在不同设备、尺寸中展示效果可能不一致，如有需要请调整内容适应
    </span>
  </div>
</template>

<script>
import up from '@/api/upload'
// import Tinymce from '@/components/Tinymce'

export default {
  components: {
    // Tinymce,
  },
  props: {
    height: {
      type: Number,
      default: 765
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      content: '',
      host: 'https://wximg.aliyinba.com/',
      setting: {
        // font_formats: '宋体=宋体;新宋体=新宋体;仿宋_GB2312=仿宋;楷体_GB2312=楷体;黑体=黑体;微软雅黑=Microsoft YaHei;Arial=Arial;Arial Black=Arial Black;Times New Roman=Times New Roman;Courier New=Courier New;Tahoma=Tahoma;Verdana=Verdana;',
        file_picker_types: 'file image media', // 上传类型
        image_description: false, // 关闭图片描述
        /**
         * 文件上传
         */
        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === 'media') {
            this.uploadMedia(this, callback)
          } else if (meta.filetype === 'image') {
            this.uploadImage(this, callback)
          } else if (meta.filetype === 'file') {
            this.uploadFile(this, callback)
          }
        },
        /**
         * 多图上传
         */
        images_upload_handler: (blobInfo, succFun, failFun) => {
          const that = this
          const file = blobInfo.blob() // 转化为易于理解的file对象
          console.log(file.name)
          const fileExtSplit = file.name.split('.')
          const ext = fileExtSplit[fileExtSplit.length - 1]
          if (
            ext !== 'jpg' &&
            ext !== 'jpeg' &&
            ext !== 'png' &&
            ext !== 'gif' &&
            ext !== 'bmp' &&
            ext !== 'PBG' &&
            ext !== 'GIF' &&
            ext !== 'JPG' &&
            ext !== 'JPEG'
          ) {
            that.$message.error({
              message: '上传资源只能是 jpg/jpeg/png/gif/bmp/PBG 格式的图片!',
              duration: 5000,
              customClass: 'zZindex'
            })
            failFun('上传资源只能是 jpg/jpeg/png/gif/bmp/PBG 格式的图片!')
            return false
          }
          if (file.size / 1024 / 1024 > 30) {
            that.$notify.error({
              title: '错误',
              offset: 100,
              message: '上传图片大小不能超过 30MB!'
            })
            failFun('上传图片大小不能超过 30MB!')
            return false
          }
          const loading = that.$loading({
            lock: true,
            text: '正在上传图片...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          // 接口
          up.uploadFiles(
            this,
            [file],
            '',
            res => {
              loading.close()
              succFun(this.host + res.url)
            },
            err => {
              loading.close()
              that.$message.error({ message: '上传失败' })
            }
          )
        },
        menubar: false,
        // menubar: "file edit insert format table",
        // menu: {
        //   file: {
        //     title: "file",
        //     items: "newdocument restoredraft fullpage print",
        //   },
        //   edit: {
        //     title: "Edit",
        //     items: "undo redo cut copy  pastetext  selectall",
        //   },
        //   insert: {
        //     title: "Insert",
        //     items: "image link media hr pagebreak visualblocks",
        //   },
        //   format: {
        //     title: "Format",
        //     items:
        //       "bold italic underline strikethrough superscript subscript | formats | removeformat",
        //   },
        //   table: {
        //     title: "Table",
        //     items: "inserttable tableprops deletetable | cell row column ",
        //   },
        // },
        // file_browser_callback: (field_name, url, type, win) => {
        //   console.log('aaaaa')
        // },
        file_brower_callback_type: 'file image media',
        toolbar: [
          'fontsizeselect forecolor backcolor bold underline strikethrough alignleft aligncenter alignright image axupimgs media link charmap table bullist numlist lineheight restoredraft'
          /* sn 备用功能库*/
          /* 'code undo redo restoredraft cut copy paste pastetext forecolor backcolor bold italic underline strikethrough link anchor ',
            'alignleft aligncenter alignright alignjustify outdent indent styleselect formatselect fontselect fontsizeselect | bullist numlist ',
            'blockquote subscript superscript removeformat table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen ',
            'bdmap indent2em lineheight formatpainter axupimgs',*/
        ],
        toolbar_drawer: 'sliding',
        // quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: ['paste advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image axupimgs imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        paste_data_images: true,
        language: 'zh_CN',
        height: this.height,
        width: this.width
      }
    }
  },
  created() {},
  methods: {
    /**
     * 上传文件
     */
    uploadFile(that, callback) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.onchange = function(e) {
        const file = this.files[0]
        if (file.size / 1024 / 1024 > 30) {
          that.$notify.error({
            title: '错误',
            offset: 100,
            message: '上传文件大小不能超过 30MB!'
          })
          return false
        }
        const loading = that.$loading({
          lock: true,
          text: '正在上传文件...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        up.uploadFiles(this, [file], '', res => {
          loading.close()
          callback(that.host + res.url)
        }),
        err => {
          loading.close()
          that.$message.error({ message: '上传失败' })
        }
      }
      input.click()
    },
    /**
     * 上传图片
     */
    uploadImage(that, callback) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/gif,image/jpeg,image/png,image/jpg')
      input.onchange = function(e) {
        const file = this.files[0]
        const fileExtSplit = file.name.split('.')
        const ext = fileExtSplit[fileExtSplit.length - 1]
        if (
          ext !== 'jpg' &&
          ext !== 'jpeg' &&
          ext !== 'png' &&
          ext !== 'gif' &&
          ext !== 'bmp' &&
          ext !== 'PBG' &&
          ext !== 'GIF' &&
          ext !== 'JPG' &&
          ext !== 'JPEG'
        ) {
          that.$message.error({
            message: '上传资源只能是 jpg/jpeg/png/gif/bmp/PBG 格式的图片!',
            duration: 5000,
            customClass: 'zZindex'
          })
          return false
        }
        if (file.size / 1024 / 1024 > 30) {
          that.$notify.error({
            title: '错误',
            offset: 100,
            message: '上传图片大小不能超过 30MB!'
          })
          return false
        }
        const loading = that.$loading({
          lock: true,
          text: '正在上传图片...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        // 接口
        up.uploadFiles(
          this,
          [file],
          '',
          res => {
            loading.close()
            callback(that.host + res.url)
          },
          err => {
            loading.close()
            that.$message.error({ message: '上传失败' })
          }
        )
      }
      input.click()
    },
    /**
     * 上传媒体
     */
    uploadMedia(that, callback) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute(
        'accept',
        'video/mp4,video/AVI,video/mov,video/FLV,video/rmvb,video/mtv,video/mpeg,audio/*'
      )
      input.onchange = function(e) {
        const file = this.files[0]
        if (file.size / 1024 / 1024 > 30) {
          that.$notify.error({
            title: '错误',
            offset: 100,
            message: '上传文件大小不能超过 30MB!'
          })
          return false
        }
        const fileExtSplit = file.name.split('.')
        const ext = fileExtSplit[fileExtSplit.length - 1]
        if (
          ext !== 'mp4' &&
          ext !== 'AVI' &&
          ext !== 'mov' &&
          ext !== 'FLV' &&
          ext !== 'rmvb' &&
          ext !== 'wmv' &&
          ext !== 'mtv' &&
          ext !== 'mpg' &&
          ext !== 'mpeg' &&
          ext !== 'mp3' &&
          ext !== 'wav'
        ) {
          that.$message.error({
            message:
              '上传资源只能是 AVI/mov/rmvb/FLV/mp4/wmv/mtv/mpg/mpeg/mp3/wav 格式的视频!',
            duration: 5000,
            customClass: 'zZindex'
          })
          return false
        }

        const loading = that.$loading({
          lock: true,
          text: '正在上传视频...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        // 上传接口
        up.uploadFiles(this, [file], '', res => {
          loading.close()
          if (res.url !== '') {
            callback(that.host + res.url)
          } else {
            that.$message.error({ message: `上传失败${res}` })
          }
        }),
        err => {
          that.$message.error({ message: '上传失败' })
          loading.close()
        }
      }
      input.click()
    },

    /**
     * 设置内容
     */
    setContent(html) {
      let CHHtml = html.replace(
        /(src=\")(\/.*?)(?=")/gim,
        `$1${this.host}$2`
      )
      CHHtml = CHHtml.replace(
        /(poster=\")(\/.*?)(?=")/gim,
        `$1${this.host}$2`
      )
      this.content = CHHtml
    },
    /**
     * 读取内容
     */
    getContent() {
      // let CHHtml = this.content.replace(
      //   /(https|http):\/\/wximg.165183.com/gi,
      //   ''
      // )
      const CHHtml = this.content.replace(
        /(https|http):\/\/wximg.aliyinba.com\//gi,
        ''
      )
      return CHHtml
    }
  }
}
</script>

<style lang="scss">

</style>
