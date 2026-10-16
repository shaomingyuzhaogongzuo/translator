<template>
  <div class="translator-container">
    <el-card class="translator-card">
      <template #header>
        <div class="card-header">
          <h1 class="title">在线翻译</h1>
          <p class="subtitle">方便 / 易用 / 快速</p>
        </div>
      </template>

      <div class="translator-content">
        <LanguageSelector
            :selected-language="targetLanguage"
            @language-change="handleLanguageChange"
        />

        <div class="translate-button-container">
          <el-button
              type="primary"
              size="large"
              @click="handleTranslate"
              :loading="isTranslating"
              class="translate-button"
          >
            翻译
          </el-button>
        </div>

        <div class="translation-area">
          <div class="input-area">
            <el-input
                v-model="inputText"
                type="textarea"
                :rows="8"
                placeholder="         "
                class="input-textarea"
                @keyup.enter.ctrl="handleTranslate"
            />
            <div class="input-footer">
              <span class="char-count">{{ inputText.length }}/500</span>
            </div>
          </div>

          <TranslationResult
              :result="translationResult"
              @clear-result="handleClearResult"
              @select-suggestion="handleWordSelect"
          />
        </div>

        <WordHints @word-selected="handleWordSelect" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { translate } from '../utils/translationData.js'
import LanguageSelector from './LanguageSelector.vue'
import TranslationResult from './TranslationResult.vue'
import WordHints from './WordHints.vue'

const inputText = ref('')
const targetLanguage = ref('english')
const translationResult = ref(null)
const isTranslating = ref(false)

const handleTranslate = async () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('请输入要翻译的中文内容')
    return
  }

  if (!targetLanguage.value) {
    ElMessage.warning('请选择目标语言')
    return
  }

  isTranslating.value = true

  setTimeout(() => {
    const result = translate(inputText.value, targetLanguage.value)
    translationResult.value = result

    if (result.success) {
      ElMessage.success('翻译成功！')
    } else {
      ElMessage.error(result.message)
    }

    isTranslating.value = false
  }, 500)
}

const handleLanguageChange = (language) => {
  targetLanguage.value = language
  const langMap = { english: '英语', french: '法语', japanese: '日语', russian: '俄语' }
  ElMessage.success(`已切换到${langMap[language] || language}`)
}

const handleWordSelect = (word) => {
  inputText.value = word
}

const handleClearResult = () => {
  translationResult.value = null
}
</script>

<style scoped>
.translator-container {
  min-height: 100vh;
  background:
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.translator-container::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  opacity: 0.3;
  pointer-events: none;
}

.translator-card {
  width: 100%;
  max-width: 1000px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header { text-align: center; padding: 20px 0; }

.title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #db2777 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 10px 0;
  letter-spacing: -0.025em;
}

.subtitle { font-size: 16px; color: #7f8c8d; margin: 0; }

.translator-content { padding: 0 20px 20px; }

.translate-button-container { text-align: center; margin-bottom: 30px; }

.translate-button {
  padding: 12px 40px;
  font-size: 16px;
  border-radius: 25px;
  font-weight: 500;
}

.translation-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.input-area { position: relative; }
.input-textarea { border-radius: 12px; }

.input-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.char-count { font-size: 12px; color: #95a5a6; }

@media (max-width: 768px) {
  .translator-container { padding: 10px; }
  .translation-area { grid-template-columns: 1fr; gap: 20px; }
  .title { font-size: 24px; }
}
</style>