export const generateCompleteNickname = () => {
  const adjectives = [
    '高冷的',
    '勇敢的',
    '温柔的',
    '神秘的',
    '帅气的',
    '可爱的',
    '冷酷的',
    '甜美的',
    '活力的',
    '俏皮的',
    '酷酷的',
    '时尚的',
    '迷人的',
    '聪明的',
    '乐观的',
  ];

  const nouns = [
    '苹果',
    '橙子',
    '月亮',
    '星星',
    '太阳',
    '猫咪',
    '狗狗',
    '虎豹',
    '小鹿',
    '海鸥',
    '天空',
    '雪花',
    '兔子',
    '玫瑰',
    '樱花',
    '草地',
    '松树',
    '沙滩',
    '大海',
    '微风',
  ];

  const actions = [
    '在双休',
    '在旅行',
    '在深夜思考人生',
    '在沙滩晒太阳',
    '在咖啡馆喝咖啡',
    '在学习',
    '在健身房挥汗如雨',
    '在爬山',
    '在追剧',
    '在度假',
    '在星空下漫步',
    '在看书',
    '在画画',
    '在参加派对',
    '在拍照',
    '在做梦',
    '在思考未来',
  ];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  return `${randomAdj}${randomNoun}${randomAction}`;
};
