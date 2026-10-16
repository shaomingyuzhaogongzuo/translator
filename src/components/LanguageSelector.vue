<template>
  <div class="language-selector">
    <span class="language-label">中文</span>
    <el-icon class="arrow-icon"><ArrowRight /></el-icon>
    <el-select
        :model-value="selectedLanguage"
        @update:model-value="handleLanguageChange"
        placeholder="选择目标语言"
        class="language-select"
        size="large"
    >
      <el-option
          v-for="option in languageOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { languageOptions } from '../utils/translationData.js'

const props = defineProps({
  selectedLanguage: {
    type: String,
    default: 'english'
  }
})

const emit = defineEmits(['language-change'])

const handleLanguageChange = (value) => {
  emit('language-change', value)
}
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  gap: 20px;
}

.language-label {
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
  padding: 12px 24px;
  background: #ecf0f1;
  border-radius: 8px;
  min-width: 80px;
  text-align: center;
  white-space: nowrap;
}

.arrow-icon {
  font-size: 20px;
  color: #3498db;
}

.language-select {
  min-width: 150px;
}
</style>