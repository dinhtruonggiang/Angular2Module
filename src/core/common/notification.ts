export class Notification {
    public static notify(message: string, icon = 'fa fa-close', type = 'info', timer = 400, title = '') {
        $.notify(
            {
                icon: icon,
                message: message,
                title: title
            }, {
                type: type,
                timer: timer
            });
    }

    public static errorNotify(message: string) {
        Notification.notify(message, 'fa fa-close', 'danger');
    }

    public static successNotify(message: string) {
        Notification.notify(message, 'fa fa-check', 'success');
    }
}
