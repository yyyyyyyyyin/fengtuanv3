<template>
	<div class="login">
		<el-form size="large" :model="state.formData" :rules="state.rules" ref="formDataRef">
			<el-form-item>
				<h1>登录页面</h1>
			</el-form-item>
			<el-form-item prop="question">
				<el-select v-model="state.formData.question" placeholder="请选择一个问题">
					<el-option :key="index" v-for="(item, index) in state.formDataQuestion" :lable="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="answer">
				<el-input v-model="state.formData.answer" placeholder="请输入问题的答案"></el-input>
			</el-form-item>
			<el-form-item prop="uname">
				<el-input v-model="state.formData.uname" placeholder="请输入账户"></el-input>
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input v-model="state.formData.pwd" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
const router = useRouter();
const unameRule = (rule, value, callback) => {
	if (/^.{2,8}$/.test(value)) {
		callback();
	} else {
		callback(new Error('至少2-8字符'));
	}
};

const state = reactive({
	formData: {
		question: '',
		answer: '',
		uname: '',
		pwd: '',
	},
	formDataQuestion: [
		{ label: '请输入你的名字', value: '请输入你的名字' },
		{ label: '请输入你老师的名字', value: '请输入你老师的名字' },
		{ label: '请输入你老爸的名字', value: '请输入你老爸的名字' },
		{ label: '请输入你老嘛的名字', value: '请输入你老嘛的名字' },
	],
	// 校验规则
	rules: {
		question: [{ required: true, message: '密保问题必须填写', trigger: 'change' }],
		answer: [
			{ required: true, message: '密保答案必须填写', trigger: 'blur' },
			{ min: 2, max: 8, message: '填写2-8个字符', trigger: 'blur' },
		],
		uname: [
			{ required: true, message: '账号必须', trigger: 'blur' },
			{ validator: unameRule, trigger: 'blur' },
		],
		pwd: [
			{ required: true, message: '密码必须填写', trigger: 'blur' },
			{ min: 2, max: 20, message: '填写2-20个字符', trigger: 'blur' },
		],
	},
});
const formDataRef = ref(null);
const submit = () => {
	console.log(formDataRef.value);
	formDataRef.value.validate((isSuccess) => {
		if (isSuccess) {
			console.log('登录成功', state.formData);
			ElMessage.success('操作成功');
			router.push({ path: '/' });
		}
	});
};
</script>

<style scoped lang="scss"></style>
