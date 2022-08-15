<template>
  <div class="map_wrap margin_top_15">
    <div id="container" :style="{ width: '800px', height: '500px' }"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const loadMap = () => new Promise((resolve, reject) => {
      window.init = () => {
        resolve(qq)
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=A4YBZ-NJB3P-ZHIDM-LX2JH-AUEO2-SMFD3'
      script.onerror = reject
      document.head.appendChild(script)
    })
    const initMap = () => {
      // 步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      // 设置地图中心点
      const myLatlng = new qq.maps.LatLng(39.916527, 116.397128)
      // 定义工厂模式函数
      const myOptions = {
        zoom: 8, // 设置地图缩放级别
        center: myLatlng, // 设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式详情参见MapType
      }
      // 获取dom元素添加地图信息
      const map = new qq.maps.Map(document.getElementById('container'), myOptions)

      console.log(map)
    }
    onMounted(() => {
      loadMap().then(() => {
        initMap()
      })
    })
  }
})
</script>
