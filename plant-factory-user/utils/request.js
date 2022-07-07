// import axios from 'axios';
// import mpAdapter from 'axios-miniprogram-adapter';
// axios.defaults.adapter = mpAdapter;

// let instance = axios.create({
//    
//     timeout: 5000,
// });
var baseURL = 'https://www.fangxingarden.com/api/v1';
export default function(config) {
    config.url = baseURL + config.url;
    return new Promise((resolve,reject)=>{
        wx.request({
            ...config,
            success(res){
                let data = res.data;
                if(data.flag){
                    resolve(data)
                }else{
                    reject(data)
                }
            }
        })
           
       
       
    });
};