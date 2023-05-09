let minValue; //= parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue; //= parseInt(prompt('Максимальное знание числа для игры','100'));

//alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber;//  = Math.floor((minValue + maxValue) / 2);

let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
//answerField.innerText = `Вы загадали число ${answerNumber }?`;

//console.log('start', minValue, maxValue, answerNumber)

let firstModal = document.querySelector('.modal.modal-minvalue');
let gameBlock = document.querySelector('.card');

document.getElementById('btnRetry').addEventListener('click', function () {
	minValue = 0;
	maxValue = 100;
	orderNumber = 0;

	orderNumberField.innerText = orderNumber;
	answerField.innerText = 'Вы загадали число 5?'

	document.querySelector('#minValStr').innerText = minValue;
	document.querySelector('#maxValStr').innerText = maxValue;

	gameBlock.classList.remove('show');

	modalControl(firstModal);
})

document.getElementById('btnOver').addEventListener('click', function () {
	if (gameRun){
		if (minValue === maxValue){
			const phraseRandom = Math.round( Math.random());
			const answerPhrase = (phraseRandom === 1) ?
				`Вы загадали неправильное число!\n\u{1F914}` :
				`Я сдаюсь..\n\u{1F92F}`;

			answerField.innerText = answerPhrase;
			gameRun = false;
		} else {
			minValue = answerNumber  + 1;
			//console.log('up', minValue, maxValue, answerNumber)
			answerNumber  = Math.floor((minValue + maxValue) / 2);
			setAnswer(answerNumber);
		}
	}
})

document.getElementById('btnLess').addEventListener('click', function () {
	if (gameRun){
		if (minValue === maxValue || minValue === answerNumber){
			const phraseRandom = Math.round( Math.random());
			const answerPhrase = (phraseRandom === 1) ?
				`Вы загадали неправильное число!\n\u{1F914}` :
				`Я сдаюсь..\n\u{1F92F}`;

			answerField.innerText = answerPhrase;
			gameRun = false;
		} else {
			maxValue = answerNumber - 1;
			//console.log('down', minValue, maxValue, answerNumber)
			answerNumber  = Math.floor((minValue + maxValue) / 2);
			setAnswer(answerNumber);
		}
	}
})

document.getElementById('btnEqual').addEventListener('click', function () {
	if (gameRun){
		const phraseRandom = Math.round( Math.random() * 3);
		const answerPhrase = (phraseRandom === 1) ?
			`Ого, я еще могу\u{1F600}` :
			(phraseRandom === 2) ? `Задача выполнена, я полетел\u{1F681}`:
				(phraseRandom === 3)? `Учись и ты сможешь также как Я`:
					`Я всегда угадываю\u{1F60E}`;
		answerField.innerText = answerPhrase;
		gameRun = false;
	}
})

function init() {
	minValue = 0;
	maxValue = 100;
	orderNumber = 0;

	gameBlock.classList.remove('show');

	let buttons = document.querySelectorAll('.modal .btn-ok');
	buttons.forEach(function (button) {
		button.addEventListener('click', function(){
			let currentModal = this.closest('.modal'),
				nextModal = document.querySelector('.'+currentModal.dataset.nextModal);

			if (currentModal.classList.contains('modal-minvalue')) {
				minValue = parseInt(currentModal.querySelector('input').value);
				//забираем и сразу устанавливаем дефолтные значения
				currentModal.querySelector('input').value = '0';
			}
			if (currentModal.classList.contains('modal-maxvalue')) {
				maxValue = parseInt(currentModal.querySelector('input').value);
				//забираем и сразу устанавливаем дефолтные значения
				currentModal.querySelector('input').value = '100';
			}

			//console.log('start0', minValue, maxValue)

			//проверка на NaN, на меньше -999 и на больше 999
			minValue = isNaN(minValue) ? 0 : minValue < -999 ? -999 : minValue > 999 ? 999 : minValue;
			maxValue = isNaN(maxValue) ? 100 : maxValue > 999 ? 999 : maxValue < -999 ? -999 : maxValue;

			//console.log('start1', minValue, maxValue)

			//подставляем в модальное окно с условиями
			document.querySelector('#minValStr').innerText = minValue;
			document.querySelector('#maxValStr').innerText = maxValue;

			modalControl(currentModal, false);
			if (nextModal !== null) {
				modalControl(nextModal);
			} else {
				lastModal = true;

				gameRun = true;

				answerNumber  = Math.floor((minValue + maxValue) / 2);
				setAnswer(answerNumber);

				orderNumber = 1;
				orderNumberField.innerText = orderNumber;

				gameBlock.classList.add('show');
			}
		});

	});

	//Эта фича, что бы по Enter модальные окна закрывались.
	document.addEventListener('keyup', function (event){
		if (event.keyCode === 13 && document.querySelector('.modal.show .btn-ok')) {
			document.querySelector('.modal.show .btn-ok').click();
		}
	});

	modalControl(firstModal);
}

//открытие закрытие начальных модальных окон
function modalControl(el, open = true) {
	if (open) {
		el.classList.add('show');
		el.style.display = 'block';
		if (el.querySelector('input')) el.querySelector('input').select();
	} else {
		el.classList.remove('show');
		el.style.display = 'none';
	}
}

//формирование вопроса
function setAnswer(answerNumber) {
	let answerNumberText = numberToString(answerNumber);
	orderNumber++;
	orderNumberField.innerText = orderNumber;
	const phraseRandom = Math.round( Math.random() * 3);
	const answerPhrase = (phraseRandom === 1) ?
		`Вы загадали число ${answerNumberText }?` :
		(phraseRandom === 2) ? `Проще простого. Это число ${answerNumberText }?`:
			(phraseRandom === 3)? `Видимо это число ${answerNumberText }?`:
				`Почти на 100% уверен, что это число ${answerNumberText }. Да?`;
	answerField.innerText = answerPhrase;

	//console.log (answerNumber, answerNumberText);
}

//преобразование числа в строку с проверкой на 20 символов и с преобразованием знака минус
function numberToString(number) {
	let arrNumbers = [
		['','один','два','три','четыре','пять','шесть','семь','восемь','девять'],
		['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],
		['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'],
		['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'],
	], sNumberTransform = '', sNumber = '', isNeg = false;

	//решение через строку тоже рабочее, однако в задаче другие условия. Я их заметил позже
	//пусть тут полежит
	// sNumber = number.toString();
	// if (sNumber[0] === '-') {
	// 	isNeg = true;
	// 	sNumber = sNumber.substring(1);
	// }
	// if (sNumber === '' || sNumber === '0') return '0';
	// if (sNumber.length === 1) sNumber = '00'+sNumber;
	// if (sNumber.length === 2) sNumber = '0'+sNumber;
	//
	// sNumberTransform = arrNumbers[3][sNumber[0]] + ' ' + (sNumber[1] === '1' ? arrNumbers[1][sNumber[2]] : arrNumbers[2][sNumber[1]] + ' ' + arrNumbers[0][sNumber[2]]);
	// sNumberTransform = (isNeg ? 'минус ':'') + sNumberTransform.trim();

	if (number == 0) return '0';
	if (number < 0) isNeg = true;
	number = Math.abs(number);

	if (number < 10) {
		sNumberTransform = arrNumbers[0][number];
		//console.log(number, sNumberTransform, '(1, 10)', isNeg);
	}

	if (number >= 10 && number < 20) {
		sNumberTransform = arrNumbers[1][number % 10];
		//console.log(number, '[10, 20)', isNeg);
	}

	if (number >= 20 && number <=99) {
		sNumberTransform = arrNumbers[2][Math.floor(number / 10)] + ' ' + arrNumbers[0][number % 10];
		//console.log(number, sNumberTransform, '[20, 99]', isNeg);
	}

	if (number > 100 && number <= 999) {
		sNumberTransform = arrNumbers[3][Math.floor(number / 100)] + ' ';
		sNumberTransform += (number % 100 >= 10 && number % 100 < 20) ? arrNumbers[1][number % 100 % 10] : arrNumbers[2][Math.floor(number / 10) % 10] + ' ' + arrNumbers[0][number % 10];
		//console.log(number, sNumberTransform, '(100, 999]', isNeg);
	}

	//т.к. в описание к задаче ничего за значение 100 не говорилось,
	//оставляю за собой право закрепить за значением 100 текст "сто"
	if (number == 100) {
		sNumberTransform = arrNumbers[3][2];
		//console.log(number, sNumberTransform, '[100, 100]]', isNeg);
	}

	sNumberTransform = (isNeg ? 'минус ':'') + sNumberTransform.trim(); //добавляем "минус" при необходимости, убираем лишние пробелы
	sNumberTransform = sNumberTransform.replace('  ',' '); //убрал двойные пробелы от трех значных чисел без десятков
	return sNumberTransform.length < 20 ? sNumberTransform : isNeg ? (-1) * number : number;
}

document.addEventListener("DOMContentLoaded", init);