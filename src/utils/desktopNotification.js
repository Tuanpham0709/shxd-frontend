import Config from '../config';


function isNewNotificationSupported() {
  if (!window.Notification || !Notification.requestPermission) {
    return false;
  }
  if (Notification.permission !== 'granted') {
    console.log('No permission!'); //eslint-disable-line
    return false;
  }
  return true;
}

/**
 * Authorize desktop notification
 */
export function authorizeDesktopNotification() {
  if (typeof Notification !== 'undefined') {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission(perm => {
        if (perm) {
          showDesktopNotification('Tuyệt vời', 'Bạn sẽ nhận được thông báo giống thông báo này khi có bài viết mới', 'vi');
        }
      });
    }
  }
}

/**
 * Show a desktop notification
 * @param title
 * @param body
 * @param lang
 */
export function showDesktopNotification(title, body, lang) {
  if (typeof Notification !== 'undefined' && isNewNotificationSupported()) {
    const notification = new Notification(title, {
      dir: 'auto',
      lang,
      icon: Config.desktopNotificationIcon,
      body,
    });

    notification.onclick = () => {
      window.focus();
    };
  }
}
