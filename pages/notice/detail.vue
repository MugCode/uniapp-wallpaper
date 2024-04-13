<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="detail.select">
				<uni-tag text="置顶" type="error" inverted></uni-tag>
			</view>
			<view class="font">
				{{ detail.title }}
			</view>
		</view>
		
		<view class="info">
			<view class="item">
				{{ detail.author }}
			</view>
			<view class="item">
				<uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>
		
		<view class="content">
			<mp-html :content="detail.content"></mp-html>
		</view>
		
		<view class="count">
			阅读 {{ detail.view_count}}
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { apiNoticeDetail } from "@/api/api.js";

const detail = ref({})

let noticeId;
onLoad((e) => {
	noticeId = e.id;
	getNoticeDetail();
})

const getNoticeDetail = () => {
	apiNoticeDetail({id:noticeId}).then((res) => {
		detail.value = res.data
	})
}

</script>

<style lang="scss" scoped>

</style>
