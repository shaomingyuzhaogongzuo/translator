export const translationData = {
    '你好': { english: 'Hello', french: 'Bonjour', japanese: 'こんにちは', russian: 'Привет' },
    '谢谢': { english: 'Thank you', french: 'Merci', japanese: 'ありがとう', russian: 'Спасибо' },
    '再见': { english: 'Goodbye', french: 'Au revoir', japanese: 'さようなら', russian: 'До свидания' },
    '是': { english: 'Yes', french: 'Oui', japanese: 'はい', russian: 'Да' },
    '不是': { english: 'No', french: 'Non', japanese: 'いいえ', russian: 'Нет' },
    '请': { english: 'Please', french: "S'il vous plaît", japanese: 'お願いします', russian: 'Пожалуйста' },
    '对不起': { english: 'Sorry', french: 'Désolé', japanese: 'すみません', russian: 'Извините' },
    '水': { english: 'Water', french: 'Eau', japanese: '水', russian: 'Вода' },
    '食物': { english: 'Food', french: 'Nourriture', japanese: '食べ物', russian: 'Еда' },
    '朋友': { english: 'Friend', french: 'Ami', japanese: '友達', russian: 'Друг' },
    '家': { english: 'Home', french: 'Maison', japanese: '家', russian: 'Дом' },
    '学校': { english: 'School', french: 'École', japanese: '学校', russian: 'Школа' },
    '工作': { english: 'Work', french: 'Travail', japanese: '仕事', russian: 'Работа' },
    '时间': { english: 'Time', french: 'Temps', japanese: '時間', russian: 'Время' },
    '钱': { english: 'Money', french: 'Argent', japanese: 'お金', russian: 'Деньги' },
    '爱': { english: 'Love', french: 'Amour', japanese: '愛', russian: 'Любовь' },
    '快乐': { english: 'Happy', french: 'Heureux', japanese: '嬉しい', russian: 'Счастливый' },
    '美丽': { english: 'Beautiful', french: 'Beau', japanese: '美しい', russian: 'Красивый' },
    '大': { english: 'Big', french: 'Grand', japanese: '大きい', russian: 'Большой' },
    '小': { english: 'Small', french: 'Petit', japanese: '小さい', russian: 'Маленький' },
    '好': { english: 'Good', french: 'Bon', japanese: '良い', russian: 'Хороший' },
    '怎么回事': { english: "What's the matter", french: "Qu'est-ce qui se passe", japanese: 'どうしたの', russian: 'В чём дело' },
    '小老弟': { english: 'Little boy', french: 'Petit garçon', japanese: '小さな男の子', russian: 'Маленький мальчик' },
    '我爱你': { english: 'I love you', french: "Je t'aime", japanese: '愛してる', russian: 'Я тебя люблю' },
    '早上好': { english: 'Good morning', french: 'Bonjour', japanese: 'おはよう', russian: 'Доброе утро' },
    '晚上好': { english: 'Good evening', french: 'Bonsoir', japanese: 'こんばんは', russian: 'Добрый вечер' },
    '生日快乐': { english: 'Happy birthday', french: 'Joyeux anniversaire', japanese: '誕生日おめでとう', russian: 'С днём рождения' },
    '新年快乐': { english: 'Happy New Year', french: 'Bonne année', japanese: 'あけましておめでとう', russian: 'С Новым годом' }
}

export const languageOptions = [
    { value: 'english', label: '英语' },
    { value: 'french', label: '法语' },
    { value: 'japanese', label: '日语' },
    { value: 'russian', label: '俄语' }
]

export function translate(chineseText, targetLanguage) {
    const trimmedText = chineseText.trim()

    if (!trimmedText) {
        return { success: false, message: '请输入要翻译的中文内容' }
    }

    if (!targetLanguage) {
        return { success: false, message: '请选择目标语言' }
    }

    const translation = translationData[trimmedText]

    if (translation && translation[targetLanguage]) {
        return {
            success: true,
            translation: translation[targetLanguage],
            originalText: trimmedText,
            targetLanguage: languageOptions.find(lang => lang.value === targetLanguage)?.label || targetLanguage
        }
    } else {
        return {
            success: false,
            message: `抱歉，暂时没有找到"${trimmedText}"的翻译`
        }
    }
}

export function getAllChineseWords() {
    return Object.keys(translationData)
}