<template>
  <div class="output-area">
    <div class="output-content" :class="{ 'has-content': result }">
      <template v-if="result && result.success">
        <div class="translation-text">{{ result.translation }}</div>
        <div class="translation-info">
          <el-tag type="success" size="small">
            {{ result.originalText }} → {{ result.targetLanguage }}
          </el-tag>
        </div>
        <div class="action-buttons">
          <el-button size="small" type="primary" @click="copyTranslation" :icon="CopyDocument">
            复制翻译
          </el-button>
          <el-button size="small" @click="clearResult" :icon="Delete">
            清空
          </el-button>
        </div>
      </template>

      <template v-else-if="result && !result.success">
        <div class="error-message">
          <el-icon class="error-icon"><WarningFilled /></el-icon>
          {{ result.message }}
        </div>
        <div class="suggestion-text">
          试试这些词汇：
          <el-tag
              v-for="word in suggestedWords"
              :key="word"
              size="small"
              type="info"
              @click="selectSuggestion(word)"
              class="suggestion-tag"
          >
            {{ word }}
          </el-tag>
        </div>
      </template>

      <template v-else>
        <div class="placeholder-text">翻译结果将显示在这里...</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { WarningFilled, CopyDocument, Delete } from '@element-plus/icons-vue'
import { getAllChineseWords } from '../utils/translationData.js'

const props = defineProps({
  result: { type: Object, default: null }
})

const emit = defineEmits(['clear-result', 'select-suggestion'])

const suggestedWords = computed(() => {
  const allWords = getAllChineseWords()
  const shuffled = [...allWords].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
})

const copyTranslation = async () => {
  if (props.result && props.result.translation) {
    try {
      await navigator.clipboard.writeText(props.result.translation)
      ElMessage.success('翻译已复制到剪贴板')
    } catch (err) {
      ElMessage.error('复制失败，请手动复制')
    }
  }
}

const clearResult = () => {
  emit('clear-result')
  ElMessage.info('已清空翻译结果')
}

const selectSuggestion = (word) => {
  emit('select-suggestion', word)
}
</script>

<style scoped>
.output-area { position: relative; }

.output-content {
  min-height: 200px;
  border: 2px dashed #bdc3c7;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fafbfc;
  transition: all 0.3s ease;
}

.output-content.has-content {
  border-color: #3498db;
  background: #ffffff;
  border-style: solid;
}

.translation-text {
  font-size: 20px;
  font-weight: 500;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 15px;
  line-height: 1.6;
}

.translation-info { margin-bottom: 15px; }

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e74c3c;
  font-size: 16px;
  margin-bottom: 15px;
}

.error-icon { font-size: 18px; }

.suggestion-text {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.suggestion-tag {
  margin: 5px 3px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-tag:hover { transform: scale(1.05); }

.placeholder-text {
  color: #95a5a6;
  font-size: 16px;
  text-align: center;
}
</style>