<template>
  <div class="word-hints">
    <el-collapse>
      <el-collapse-item title="查看可翻译的词汇" name="words">
        <div class="search-container">
          <el-input
              v-model="searchKeyword"
              placeholder="搜索词汇..."
              size="small"
              clearable
              :prefix-icon="Search"
          />
        </div>

        <div class="category-tabs">
          <el-button
              v-for="category in categories"
              :key="category.key"
              :type="activeCategory === category.key ? 'primary' : 'default'"
              size="small"
              @click="setActiveCategory(category.key)"
          >
            {{ category.label }} ({{ category.count }})
          </el-button>
        </div>

        <div class="word-list">
          <el-tag
              v-for="word in filteredWords"
              :key="word"
              class="word-tag"
              @click="selectWord(word)"
              type="info"
              effect="plain"
          >
            {{ word }}
          </el-tag>
        </div>

        <div class="stats">
          <el-text size="small" type="info">
            共 {{ filteredWords.length }} 个词汇可翻译
          </el-text>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getAllChineseWords } from '../utils/translationData.js'

const emit = defineEmits(['word-selected'])

const searchKeyword = ref('')
const activeCategory = ref('all')

const allWords = getAllChineseWords()

const categories = computed(() => {
  const basicWords = allWords.filter(word => word.length <= 2)
  const phrases = allWords.filter(word => word.length > 2)

  return [
    { key: 'all', label: '全部', count: allWords.length },
    { key: 'basic', label: '基础词汇', count: basicWords.length },
    { key: 'phrases', label: '短语', count: phrases.length }
  ]
})

const filteredWords = computed(() => {
  let words = allWords

  if (activeCategory.value === 'basic') {
    words = words.filter(word => word.length <= 2)
  } else if (activeCategory.value === 'phrases') {
    words = words.filter(word => word.length > 2)
  }

  if (searchKeyword.value.trim()) {
    words = words.filter(word => word.includes(searchKeyword.value.trim()))
  }

  return words.sort()
})

const setActiveCategory = (category) => {
  activeCategory.value = category
}

const selectWord = (word) => {
  emit('word-selected', word)
  ElMessage.info(`已选择词汇：${word}`)
}
</script>

<style scoped>
.word-hints {
  padding: 0 20px;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 12px;
}

.word-hints :deep(.el-collapse) {
  border: none;
  background: transparent;
}

.word-hints :deep(.el-collapse-item__header) {
  background: transparent;
  border: none;
  font-weight: 500;
  color: #2c3e50;
}

.word-hints :deep(.el-collapse-item__content) {
  padding: 10px 0 20px 0;
}

.search-container { margin-bottom: 15px; }

.category-tabs {
  margin-bottom: 15px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.word-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.word-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stats {
  text-align: center;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}
</style>