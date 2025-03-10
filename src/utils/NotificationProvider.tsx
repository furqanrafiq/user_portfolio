import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext<any>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={api}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotify = () => {
    return useContext(NotificationContext);
};