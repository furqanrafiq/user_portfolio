import { Switch } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'
import { useNotify } from '../../../utils/NotificationProvider'
import { storeUserReducer } from '../../Auth/redux/authSlice'

const Settings = () => {
    const user = useSelector((state) => state?.user?.user)
    const notify = useNotify()
    const dispatch = useDispatch()

    function handleTwoFactor(twoFactor) {
        const body = {
            uuid: user?.uuid,
            twoFactorEnabled: twoFactor
        }
        return api.post(`${apiURL}/user/enable-disable-twofactor`, body).then((res) => {
            notify.success({
                message: 'Success!',
                description: res.data.msg,
                placement: 'topRight',
            });
            dispatch(storeUserReducer(res.data.user));
        })
    }

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Settings</p>
            </div>
            <div className='flex '>
                <p className='mr-3'>Two Factor Authentication:</p>
                <Switch defaultChecked={user?.twoFactorEnabled} onChange={(e) => handleTwoFactor(e)} />
            </div>
        </div>
    )
}

export default Settings