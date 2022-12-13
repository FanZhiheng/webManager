const formRegExp = {
  userName: {
    pattern: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
    message: '长度3-16位，必须字母开头，允许字母或数字的组合，允许携带下划线',
    trigger: 'blur'
  },
  letterOrNumber: {
    pattern: /^[a-zA-Z0-9_]*$/,
    message: '只允许字母或数字的组合，允许携带下划线',
    trigger: 'blur'
  },
  chinese: {
    pattern: /^[\u4E00-\u9FA5]+$/,
    message: '必须是中文',
    trigger: 'blur'
  },
  name: {
    pattern: /^[\u4E00-\u9FA5]{2,4}$/,
    message: '姓名必须是2-4位的中文',
    trigger: 'blur'
  },
  phone: {
    pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
    message: '请输入正确的手机号码',
    trigger: 'blur'
  },
  email: {
    pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    message: '请输入正确的邮箱',
    trigger: 'blur'
  },
  letterAndNumber: {
    pattern: /^[a-zA-Z0-9]+$/,
    message: '只能输入字母和数字',
    trigger: 'blur'
  },
  letterAndNumberAndCn: {
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
    message: '只能输入字母、数字和中文',
    trigger: 'blur'
  },
  number: {
    pattern: /^\d+$|^\d+[.]?\d+$/,
    message: '只能输入数字',
    trigger: 'blur'
  },
  number32: {
    pattern: /^[0-9]{0,32}$/,
    message: '最多输入32位数字',
    trigger: 'blur'
  },
  integer: {
    pattern: /^\+?[1-9]\d*$/,
    message: '只能输入正整数',
    trigger: 'blur'
  },
  decimal2: {
    pattern: /^\d+\.\d{2}$/,
    message: '精确到小数点后2位的数字（例：1.00）',
    trigger: 'blur'
  },
  percentage4: {
    pattern: /^[0]+(\.\d{0,4})?$/,
    message: '最多保留4位小数',
    trigger: 'blur'
  },
  password: {
    pattern: /^[0-9a-zA-Z]{6,20}$/,
    message: '请输入6-20位的数字或者字母',
    trigger: 'blur'
  },
  strongPassword: {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    message: '请输入6-20位长度的密码，必须包含一个及以上的大写、小写和数字',
    trigger: 'blur'
  },
  letterAndNumberAndCn20: {
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,
    message: '只允许字母或数字或中文的组合, 最长20位',
    trigger: 'blur'
  },
}

export default formRegExp;
