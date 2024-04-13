<template>
	<view class="classLayout">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify pageBg">
			<theme-item v-for="item in classifyList" :key="item._id" :data="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShareAppMessage, onShareTimeline } from "@/dcloudio/uni-app"
import { compareTimestamp } from '@/utils/common.js'
import { apiGetClassify } from '@/api/api.js'
const classifyList = ref([]);

const getClassify = async() => {
	let res = await apiGetClassify({
		pageSize:15
	});
	classifyList.value = res.data;
}

//分享给好友
onShareAppMessage((e) => {
	return {
		title: "虾米壁纸, 精选分类",
		path: "/pages/classify/classify"
	}
})

//分享朋友圈
onShareTimeline ((e) => {
	return {
		title: "虾米壁纸, 好看的壁纸"
	}
})

getClassify();
</script>

<style lang="scss" scoped>
	.classify{
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 15rpx;
	}
</style>
