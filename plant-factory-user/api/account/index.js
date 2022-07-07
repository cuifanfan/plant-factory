import request from '../../utils/request'

export function login(code,data) {
    return request({
        url:`/login/user/${code}`,
        method:'post',
        data
    })
}