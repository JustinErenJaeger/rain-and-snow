let container = document.querySelector('.container');
let boxHolder = document.querySelector('.box-holder');
let output = document.getElementById('output');
let rainSound = new Audio('./audio/rain-sound.mp3');
let snowSound = new Audio('./audio/snow-sound.mp3');
let muteBtn = document.querySelector('.muteBtn');
let rainBtn = document.querySelector('.rainBtn');
let snowBtn = document.querySelector('.snowBtn');
let rain = './img/drop.png';
let snow = './img/snow.png';

let condition = null;
let color = null;

function generateElements() {
	let bgImage = document.querySelector('.bg-image');
	bgImage.src = './img/140510.jpg';

	for (let x = 0; x < 300; x++) {
		let img = document.createElement('img');
		container.append(img);
		img.id = 'imgs';
	}

	for (let r = 0; r < 40; r++) {
		let boxes = document.createElement('div');
		boxHolder.append(boxes);
		boxes.className = 'boxes';
	}
}

window.onload = generateElements;

let clicked = null;

function rainToggle() {
	let message = null;
	if (condition === null || 'snow') {
		condition = 'rain';
		color = 'rgb(255, 255, 255)';
		rainBtn.style.transform = `scale(1.3)`;
		rainBtn.style.border = `0.2rem solid ${color}`;
		snowBtn.style.border = `0`;
		snowBtn.style.transform = `scale(1)`;
		muteBtn.style.border = `0`;
		muteBtn.style.transform = `scale(1)`;
		muteBtn.style.transform = 'translateX(-50%)';

		if (clicked === 'rain') {
			message = `ITS ALREADY RAINING BRUV!<img src="./img/laughing-emoji.png" class="laughing-emoji"/>`;
		} else {
			message = 'YAY RAIN';
		}

		clicked = 'rain';

		setCondition(condition);
		bgHanlder(condition);
		setProperties();
		ouputHanlder(message, condition);
		soudEffectHandler(condition);
	}
}

function snowToggle() {
	let message = null;
	if (condition === null || 'rain') {
		condition = 'snow';
		color = 'rgb(40, 40, 255)';
		snowBtn.style.border = `0.2rem solid ${color}`;
		snowBtn.style.transform = `scale(1.3)`;
		rainBtn.style.border = `0`;
		rainBtn.style.transform = `scale(1)`;
		muteBtn.style.border = `0`;
		muteBtn.style.transform = `scale(1)`;
		muteBtn.style.transform = 'translateX(-50%)';

		if (clicked === 'snow') {
			message = `ITS ALREADY SNOWING BRUV!<img src="./img/laughing-emoji.png" class="laughing-emoji"/>`;
		} else {
			message = 'YAY SNOW';
		}

		clicked = 'snow';

		setCondition(condition);
		bgHanlder(condition);
		setProperties();
		ouputHanlder(message, condition);
		soudEffectHandler(condition);
	}
}

function muteToggle() {
	rainBtn.style.border = `0`;
	rainBtn.style.transform = `scale(1)`;
	snowBtn.style.border = `0`;
	snowBtn.style.transform = `scale(1)`;

	output.innerHTML = 'MUTED';
	bgImage.src = './img/140510.jpg';

	Object.assign(muteBtn.style, {
		transform: 'translateX(-50%) scale(1.3)',
		border: `0.2rem solid ${color}`,
	});

	if (clicked === 'rain') {
		rainSound.pause();
		snowSound.pause();
		clicked = null;
	} else if (clicked === 'snow') {
		rainSound.pause();
		snowSound.pause();
		clicked = null;
	}
}

function setCondition(getCondition) {
	let path = null;
	let imgClass = null;
	console.log(getCondition);

	if (getCondition === 'rain' || null) {
		path = rain;
		imgClass = 'rainDrop';
	} else if (getCondition === 'snow' || null) {
		path = snow;
		imgClass = 'snowFlake';
	}

	setProperties(path, imgClass);
}

function setProperties(getPath, getImgClass) {
	let imgs = document.querySelectorAll('#imgs');
	let styles = null;
	for (let x = 0; x < imgs.length; x++) {
		const allImgs = imgs[x];
		let number = Math.random(5) * 10;

		switch (getImgClass) {
			case 'rainDrop':
				allImgs.src = getPath;
				allImgs.classList.remove('snowFlake');
				allImgs.className = getImgClass;
				console.log(getImgClass);

				if (number < 0.8) {
					number = 0.8;
				} else if (number > 1.2) {
					number = 1.2;
				}

				styles = {
					zIndex: '5',
					top: '-5rem',
					position: 'absolute',
					width: '0.3rem',
					height: '1rem',
					transform: 'rotateZ(-10deg)',
					transform: `scale(${Math.random(1) * 4}) rotateZ(0deg)`,
					left: `${Math.random(0) * 100}%`,
					animation: `raining infinite linear ${number}s ${
						Math.random(0) * 10
					}s`,
				};

				Object.assign(allImgs.style, styles);
				break;

			case 'snowFlake':
				allImgs.src = getPath;
				allImgs.classList.remove('rainDrop');
				allImgs.className = getImgClass;
				console.log(getImgClass);

				if (number < 10) {
					number = 10;
				} else if (number > 2) {
					number = 2;
				}

				styles = {
					zIndex: '5',
					top: '-5rem',
					position: 'absolute',
					width: '2rem',
					height: '2rem',
					transform: `scale(${Math.random(1) * 4})`,
					left: `${Math.random(0) * 100}%`,
					animation: `snowing infinite ease-in-out ${number}s ${
						Math.random(5) * 10
					}s`,
				};

				Object.assign(allImgs.style, styles);
				break;
		}
	}
}

function bgHanlder(getCondition) {
	let box = document.querySelectorAll('.boxes');
	let bg1 = './img/bg-1.jpg';
	let bg2 = './img/bg-2.jpg';
	let anim = null;

	bgImage = document.querySelector('.bg-image');

	if (getCondition === 'rain') {
		bgImage.src = bg1;
		anim = 'pop-1';
	} else {
		bgImage.src = bg2;
		anim = 'pop-2';
	}

	for (let i = 0; i < box.length; i++) {
		const boxes = box[i];

		styler = {
			right: '0',
			position: 'relative',
			zIndex: '1000',
			background: 'rgb(0, 0, 0)',
			animation: `${anim} ease forwards ${0.08 * 4}s ${i * 0.1}s`,
		};

		Object.assign(boxes.style, styler);
	}
}

function ouputHanlder(getMessage, getCondition) {
	output.style.fontSize = '6rem';
	output.innerHTML = getMessage;

	if (getCondition === 'rain') {
		output.className = 'active-1';
	} else if (getCondition === 'snow') {
		output.className = 'active-2';
	}
}

function soudEffectHandler(getCondition) {
	if (getCondition === 'rain') {
		snowSound.pause();
		rainSound.play();
	} else if (getCondition === 'snow') {
		rainSound.pause();
		snowSound.play();
	} else {
		rainSound.pause();
		snowSound.pause();
	}
}
