// 卡号4位一个空格
export function formatCard(card) {
  return card.replace(/(\d{4})/g, '$1 ').trim();
}

// 设置手机号 138 **** 1313
export function formatPhone1(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/g, '$1 **** $3');
}

// 设置手机号 138-1313-1313
export function formatPhone2(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/g, '$1 $2 $3');
}

// 转数字
export function formatNumber(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

