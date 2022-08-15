<template>
  <div class="editor_wrap" :style="{maxWidth: maxWidth}">
    <editor v-model="content" :init="init" @change="handleValueChange" />
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import plugins from './plugins'
import toolbar from './toolbar'

export default defineComponent({
  props: {
    maxWidth: {
      type: String,
      default: '800px'
    },
    height: {
      type: Number,
      default: 300
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  components: {
    Editor
  },
  setup(props, ctx) {
    const init = reactive({
      height: props.height,
      language: 'zh_CN',
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar,
      menubar: true,
      plugins,
      branding: false,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 800,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      default_link_target: '_blank',
      link_title: false,
      nonbreaking_force_tab: true
    })

    const content = ref(props.modelValue)

    const handleValueChange = () => {
      ctx.emit('update:modelValue', content.value)
    }

    return {
      init,
      content,
      handleValueChange
    }
  }
})
</script>
