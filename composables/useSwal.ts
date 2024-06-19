import type { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2/dist/sweetalert2.js'
import Swal from 'sweetalert2'

type SwalStype = 'toast' | 'popup'
interface SetSwalFireData {
  stype: SwalStype
  icon: SweetAlertIcon
  title: string
  text: string
  isHTML?: boolean
  isCloseTimer?: boolean
}

export const swalPopup = Swal.mixin({
  customClass: {
    confirmButton: 'btn login-btn text-btn1',
    cancelButton: 'btn add_session-btn text-btn1'
  },
  buttonsStyling: false,
  showConfirmButton: false,
  showCancelButton: true,
  cancelButtonText: '關閉',
  timer: 3000,
  timerProgressBar: true,
  reverseButtons: true,
  // 滑鼠滑入或滑出視窗 自動暫停或繼續進度條進度
  didOpen: (el) => {
    el.onmouseenter = Swal.stopTimer
    el.onmouseleave = Swal.resumeTimer
  }
})

export const swalToast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  position: 'bottom-end',
  timer: 3000,
  timerProgressBar: true
})

/**
 * 設定 Swal
 *
 * @param stype Swal 樣式；toast(吐司)或(popup)彈跳視窗
 * @param icon Swal icon 狀態；success、error、warning、info、question
 * @param title 標題
 * @param text 內文
 * @param isHTML 是否 text 為 HTML 格式，預設 "false"
 * @param isCloseTimer 是否關閉計時器，預設 "false"
 */

export const setSwalFire = ({
  stype,
  icon,
  title,
  text,
  isHTML,
  isCloseTimer
}: SetSwalFireData) => {
  const currentSwal = stype === 'toast' ? swalToast : swalPopup
  const options: SweetAlertOptions = {
    icon,
    title,
    text: isHTML ? undefined : text,
    html: isHTML ? text : undefined
  }

  if (isCloseTimer) {
    options.timer = undefined
  }

  return currentSwal.fire(options)
}
