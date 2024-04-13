<template>
	<view class="classList">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData? 'noMore': 'loading'"></uni-load-more>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from "@/dcloudio/uni-app";
import { apiGetClassList, apiGetHistoryList } from "@/api/api.js";
import { gotoHome } from "@/utils/common.js";

const classList = ref([]);
const noData = ref(false);

const queryParams = {
	pageNum: 1,
	pageSize: 12
};

let pageName;
onLoad((e) => {
	let { id=null, name=null, type=null } = e;
	if(!id){
		gotoHome();
		return;
	} 
	if(type) queryParams.type = type;
	queryParams.classid = id
	pageName = name
	uni.setNavigationBarTitle({
		title:pageName
	})
	getClassList();
})

onReachBottom(() => {
	if(noData.value)return;
	queryParams.pageNum++;
	getClassList();
})

const getClassList = async() =>{
	let res;
	if(queryParams.classid) res = await apiGetClassList(queryParams);
	if(queryParams.type) res = await apiGetHistoryList(queryParams);
	//todo防抖
	classList.value = [...classList.value,...res.data];
	if(queryParams.pageSize > res.data.length) noData.value = true;
	uni.setStorageSync("storgClassList",classList.value);

}

//分享给好友
onShareAppMessage((e) => {
	return {
		title: "虾米壁纸"+pageName,
		path: "/pages/classList/classList?id="+queryParams.classid+"&name="+pageName
	}
})

//分享朋友圈
onShareTimeline ((e) => {
	return {
		title: "虾米壁纸",
		imageUr: "id="+queryParams.classid+"&name="+pageName
	}
})

onUnload(() => {
	uni.removeStorageSync("storgClassList")
})
</script>

<style lang="scss">
.classList{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
