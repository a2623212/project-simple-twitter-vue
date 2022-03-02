import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      moment.locale('zh-tw')
      if (!dateTime) return "-";
      return moment(dateTime).fromNow()
    },
  },
}

export const exactDateFilter = {
  filters: {
    exactDate(dateTime) {
      moment.locale('zh-tw')
      if (!dateTime) return "-";
      return moment(dateTime).format('a h:mm ⋅ YYYY年M月Do');
    },
  },
}
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}