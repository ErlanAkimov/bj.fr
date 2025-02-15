export default function calculateRemainingTime(lastTime: number) {
	const now: number = Date.now();
	const lastTimeDate: number = Number(new Date(lastTime));
	const diff = 24 * 60 * 60 * 1000 - (now - lastTimeDate);

	if (diff <= 0) return '00:00:00';

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
