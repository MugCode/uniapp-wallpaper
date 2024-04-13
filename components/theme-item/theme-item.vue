<template>
	<view class="themeItem">
		<navigator :url="'/pages/classList/classList?id='+data._id+'&name='+data.name" class="box" v-if="!isMore">
			<image class="pic" :src="data.picurl" mode="aspectFill"></image>
			<view class="mask">
				{{data.name}}
			</view>
			<view class="tab" v-if="compareTimestamp(data.updateTime)">
				{{compareTimestamp(data.updateTime)}}天前更新
			</view>
		</navigator>
		
		<navigator url="/pages/classify/classify" open-type="switchTab" class="box more" v-else>
			<image class="pic" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { compareTimestamp } from '@/utils/common.js'
	
defineProps({
	isMore:{
		type:Boolean,
		default: false
	},
	data:{
		type: Object,
		default(){
			return{
				name:"默认名称",
				picurl:"../../common/images/classify1.jpg",
				updateTime: compareTimestamp(Date.now() - 1000*60*60*5)
			}
		}
	}
})
</script>

<style lang="scss">
.themeItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			width: 100%;
			height: 70rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(20rpx);
			font-size: 30rpx;
			font-weight: 600;
		}
		.tab{
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(250, 129, 90, 0.7);
			color: #fff;
			backdrop-filter: blur(20rpx);
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			transform: scale(0.8);
			// 以左上角进行缩放
			transform-origin: left top;
		}
	}
	.box.more{
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text{
			font-size: 28rpx;
		}
	}
}
</style>