// ================ STARFIELD HOME BACKGROUND ================

function randRange(min, max) {
	return Math.random() * (max - min) + min;
}

const getPointerInput = (callback) => {
	let pointer = {
		x: false,
		y: false
	};
	
	const mouseMove = (event) => {
		if (event.touches) {
			[x, y] = [event.touches[0].clientX, event.touches[0].clientY];
		} else {
			[x, y] = [event.clientX, event.clientY];
		}
		pointer.x = x;
		pointer.y = y;

		callback(pointer)
	}
	document.addEventListener('touchstart', (e) => mouseMove(e), true);
	document.addEventListener('touchmove', (e) => mouseMove(e), true);
	document.addEventListener('mousemove', (e) => mouseMove(e), true);
}

function fillStarfield(canvas, canvasIndex) {
	let stars = canvas.offsetWidth < 1400 ? 100 : 133;
	const context = canvas.getContext('2d');
	
	for (let i = 0; i < stars; i++) {
		let radius = canvasIndex == 0 ? randRange(1,1.5): canvasIndex == 1 ? randRange(.5,1) : randRange(0,.5);
		x = randRange(0,canvas.offsetWidth);
		y = randRange(0,canvas.offsetHeight);
		
		context.beginPath();
		context.arc(x,y,radius,0,360);
		context.fillStyle = `rgba(${randRange(140,220)},${randRange(170,240)},${randRange(230,255)},${randRange(0.5,1)})`;
		context.fill()
	}
}

function buildStarfields(body, canvasArr) {
	for (let i = 0; i < canvasArr.length; i++) {
		const canvas = canvasArr[i];
		canvas.width = body.offsetWidth;
		canvas.height = body.offsetHeight;

		fillStarfield(canvas, i);
	}

	let handlePointer = (pointer) => {
		const xBodyHalf = body.offsetWidth/2;
		const yBodyHalf = body.offsetHeight/2;
		
		if (true) {
			canvasArr[0].style.transform = `
			translate(
				${Math.floor((pointer.x - xBodyHalf)*.05)}px,
				${Math.floor((pointer.y - yBodyHalf)*.05)}px) 
			scale(
				${1 - Math.abs(Math.round((pointer.x - xBodyHalf)/body.offsetWidth*20)/100)},
				${1 - Math.abs(Math.round((pointer.y - yBodyHalf)/body.offsetHeight*20)/100)})`;
			
			canvasArr[1].style.transform = `scale(
				${1 - Math.abs(Math.round((pointer.x - xBodyHalf)/body.offsetWidth*10)/100)},
				${1 - Math.abs(Math.round((pointer.y - yBodyHalf)/body.offsetHeight*10)/100)})`;

			canvasArr[2].style.transform = `
			translate(
				${Math.floor((-pointer.x + xBodyHalf)*.01)}px,
				${Math.floor((-pointer.y + yBodyHalf)*.01)}px) 
			scale(
				${1 - Math.abs(Math.round((pointer.x - xBodyHalf)/body.offsetWidth*5)/100)},
				${1 - Math.abs(Math.round((pointer.y - yBodyHalf)/body.offsetHeight*5)/100)})`;
		} else {
			canvasArr[0].style.transform = `translate(
				${Math.floor((pointer.x - xBodyHalf)*.03)}px,
				${Math.floor((pointer.y - yBodyHalf)*.03)}px)`;
			
			canvasArr[1].style.transform = `translate(
				${Math.floor((-pointer.x + xBodyHalf)*.010)}px,
				${Math.floor((-pointer.y + yBodyHalf)*.010)}px)`;

			canvasArr[2].style.transform = `translate(
				${Math.floor((-pointer.x + xBodyHalf)*.005)}px,
				${Math.floor((-pointer.y + yBodyHalf)*.005)}px)`;
		}
	};

	getPointerInput(handlePointer);
}

// ================ SETUP ================
const canvasArr = Array.from(document.querySelectorAll('.starfield'));
function setup() {
	const body = document.querySelector('body');

	buildStarfields(body, canvasArr);

}

window.addEventListener("load", setup);