
export function compareTimestamp(timestamp) {
    const now = new Date().getTime();
    const difference = now - timestamp;

    // 转换为秒数
    const seconds = Math.floor(difference / 1000);
    // 转换为分钟
    const minutes = Math.floor(seconds / 60);
    // 转换为小时
    const hours = Math.floor(minutes / 60);
    // 转换为天数
    const days = Math.floor(hours / 24);
    // 转换为月份
    const months = Math.floor(days / 30);

    if (months >= 3) {
        return null;
    } else if (days >= 1) {
        return months >= 1 ? `${months} 月` : `${days} 天`;
    } else if (hours >= 1) {
        return `${hours} 小时`;
    } else if (minutes >= 1) {
        return `${minutes} 分钟`;
    } else {
        return "1 分钟";
    }
}


export function gotoHome(){
	uni.showModal({
		title:"提示",
		content: "页面有误将返回首页",
		showCancel: false,
		success: (res) => {
			if(res.confirm){
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		}
	})
}