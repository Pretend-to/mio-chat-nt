import { systemchat, getconfig } from "./middleware";

export function reset(uin) {
    systemchat(config.resetprompt, uin);
}

export async function initcontactor(contactor) {

    const config = getconfig()

    const msg = `${config.loadprompt}${contactor.title}`

    console.log(msg)

    systemchat(msg, contactor.uin)
        .then(result => {
            console.log('操作成功:', result);
            // 在这里处理操作成功的结果
        })
        .catch(error => {
            console.error('操作失败:', error);
            // 在这里处理操作失败的错误
        });
}