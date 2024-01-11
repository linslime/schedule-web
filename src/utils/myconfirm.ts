import { Modal } from 'ant-design-vue';
export default function myconfirm(){
    return new Promise((resolve,reject)=>{
        Modal.confirm({
            title:'系统提示',
            okText:'确定',
            content:'确实删除该数据吗?',
            okType:'danger',
            cancelText:'取消',
            onOk:()=>{
                resolve(true)
            },
            onCancel(){
                reject(false)
            }
        })
    }).catch(()=>{
        return false;
    })
}