import axios from 'axios';

export const api = axios.create({
	baseURL: `https://${import.meta.env.VITE_DOMAIN}/api`,
	headers: {
		"init-data": window.Telegram.WebApp.initData
	}
})