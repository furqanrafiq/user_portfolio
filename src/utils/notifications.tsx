import { notification } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const openNotification = (placement: NotificationPlacement, type: NotificationType, message: string) => {
    notification[type]({
        message,
        placement,
        icon: type === 'success'
            ? <CheckCircleTwoTone twoToneColor="#52c41a" />
            : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
    });
};
