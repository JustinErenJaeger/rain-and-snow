let container = document.querySelector('.container');
let bg1 = document.querySelector('.bg-1');
let bg2 = document.querySelector('.bg-2');
let rainBtn = document.querySelector('.rainBtn');
let snowBtn = document.querySelector('.snowBtn');
let rain = './img/drop.png';
let snow = './img/snow.png';

let condition = null;
let color = null;

for (let x = 0; x < 300; x++) {
	let element = document.createElement('div');
	let img = document.createElement('img');
	container.append(element);
	element.append(img);
	element.id = 'divs';
	img.id = 'imgs';
}

// GETS ALL THE IMAGE TAGS
let divs = document.querySelectorAll('#divs');
let imgs = document.querySelectorAll('#imgs');

function setProperties(path, elementClass, imgClass) {
	// LOOPS THROUGH ALL THE IMAGE TAGS
	for (let x = 0; x < divs.length; x++) {
		const allDivs = divs[x];
		const allImgs = imgs[x];

		if (elementClass === 'rainDrop') {
			allImgs.src = path;
			allImgs.className = imgClass;
			allDivs.className = elementClass;

			let number = Math.random(5) * 10;

			if (number < 0.8) {
				number = 0.8;
			} else if (number > 1.2) {
				number = 1.2;
			}

			allDivs.style.transform = `scale(${Math.random(1) * 4})`;
			allDivs.style.animationDuration = `${number}s`;
			allDivs.style.left = `${Math.random(0) * 100}%`;
			allDivs.style.animationDelay = `${Math.random(5) * 10}s`;
		} else if (elementClass === 'snowFlake') {
			allImgs.src = path;
			allImgs.classList.remove('rainDrop');
			allImgs.className = imgClass;

			allDivs.classList.remove('rainDrop');
			allDivs.className = elementClass;

			let number = Math.random(5) * 10;
			if (number < 10) {
				number = 10;
			} else if (number > 2) {
				number = 2;
			}

			allDivs.style.transform = `scale(${Math.random(1) * 4})`;
			allDivs.style.animationDuration = `${number}s`;
			allDivs.style.left = `${Math.random(0) * 100}%`;
			allDivs.style.animationDelay = `${Math.random(5) * 10}s`;
		}
	}
}

let clicked = null;

function rainToggle() {
	bg1.classList.add('bg-active');
	bg1.classList.remove('bg-inactive');
	bg2.classList.add('bg-inactive');
	bg2.classList.remove('bg-active');
	let output = document.getElementById('output');
	output.innerHTML = `RAINING...`;
	if (condition === null || 'snow') {
		if (clicked === 'rain')
			output.innerHTML = `ITS ALREADY RAINING BRUV!<img src="./img/laughing-emoji.png" class="laughing-emoji"/>`;
		output.style.fontSize = '6rem';
		setTimeout(() => {
			output.innerHTML = ``;
		}, 3000);
		condition = 'rain';
		color = 'rgb(255, 255, 255)';
		rainBtn.style.transform = `scale(1.3)`;
		rainBtn.style.border = `0.2rem solid ${color}`;
		snowBtn.style.border = `0`;
		snowBtn.style.transform = `scale(1)`;

		setCondition(condition);
		setProperties();
	}

	clicked = 'rain';
}

function snowToggle() {
	bg1.classList.add('bg-inactive');
	bg1.classList.remove('bg-active');
	bg2.classList.add('bg-active');
	bg2.classList.remove('bg-inactive');
	let output = document.getElementById('output');
	output.innerHTML = `SNOWING...`;
	if (condition === null || 'rain') {
		if (clicked === 'snow')
			output.innerHTML = `ITS ALREADY SNOWING BRUV!<img src="./img/laughing-emoji.png" class="laughing-emoji"/>`;
		output.style.fontSize = '6rem';
		setTimeout(() => {
			output.innerHTML = ``;
		}, 3000);
		condition = 'snow';
		color = 'rgb(40, 40, 255)';
		snowBtn.style.border = `0.2rem solid ${color}`;
		snowBtn.style.transform = `scale(1.3)`;
		rainBtn.style.border = `0`;
		rainBtn.style.transform = `scale(1)`;

		setCondition(condition);
		setProperties();
	}

	clicked = 'snow';
}

function setCondition(weather) {
	let path = null;
	let elementClass = null;
	let imgClass = null;
	if (weather === 'rain' || null) {
		path = rain;
		elementClass = 'rainDrop';
		imgClass = 'drop';
	} else if (weather === 'snow' || null) {
		path = snow;
		elementClass = 'snowFlake';
		imgClass = 'flake';
	}
	setProperties(path, elementClass, imgClass);
}
