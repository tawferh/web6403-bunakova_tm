class Registration {
	constructor(email, password, agree) {
		this.email = email;
		this.password = password;
		this.agree = agree;
	}

	printToConsole() {
		console.group('Новая регистрация в «Пенке»');
		console.table({
			Почта: this.email,
			Пароль: '*'.repeat(this.password.length),
			Согласие: this.agree ? 'да' : 'нет',
		});
		console.groupEnd();
	}
}

const form = document.querySelector('.form');
const formStatus = document.querySelector('.form__status');

form.addEventListener('submit', function (event) {

	event.preventDefault();

	const email = document.getElementById('guest-email').value;
	const password = document.getElementById('guest-password').value;
	const agree = document.getElementById('guest-agree').checked;

	const registration = new Registration(email, password, agree);

	registration.printToConsole();

	formStatus.textContent = 'Отправляем…';

	fetch(form.action, {
		method: 'POST',
		body: new FormData(form),
	})
		.then(function (response) {
			if (response.ok) {
				formStatus.textContent = 'Спасибо! Регистрация отправлена.';
				form.reset();
			} else {
				formStatus.textContent = 'Сервер вернул ошибку: ' + response.status;
			}
		})
		.catch(function () {
			formStatus.textContent = 'Не удалось связаться с сервером. Проверьте интернет.';
		});
});