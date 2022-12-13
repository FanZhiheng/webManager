import moment from 'moment';

export default {
  formatTime(time, type = "YYYY-M-D HH:mm") {
    return moment(time).format(type);
  },

  formatPhone(phone) {
    phone = String(phone);
    return phone.replace(/(\d{3})(\d{4})(\d{4})/g, '$1 $2 $3');
  }
}