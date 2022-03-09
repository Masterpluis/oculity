// ================ STARFIELD HOME BACKGROUND ================
// The homepage background represents a galaxy full of stars, which shifts based on cursor movement.
// ================
function randRange(min, max) {
	return Math.random() * (max - min) + min;
}

// ================
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

class Starfield {
	constructor(body, canvasArr) {
		this.canvasArr = canvasArr;
		this.body = body;
		this.width = this.body.offsetWidth;
		this.height = this.body.offsetHeight;
	}
}

// ================
function fillStarfield(canvas, canvasIndex) {
	let stars = canvas.offsetWidth < 1400 ? 100 : canvas.offsetWidth < 2000 ? 133: 150;
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

// ================
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
				${Math.floor(11/xBodyHalf*(pointer.x - xBodyHalf))}px,
				${Math.floor(11/yBodyHalf*(pointer.y - yBodyHalf))}px) 
			scale(
				${1 - Math.round(5/xBodyHalf*Math.abs(pointer.x - xBodyHalf))/100},
				${1 - Math.round(5/yBodyHalf*Math.abs(pointer.y - yBodyHalf))/100})`;
			
			canvasArr[1].style.transform = `
			scale(
				${1 - Math.round(3/xBodyHalf*Math.abs(pointer.x - xBodyHalf))/100},
				${1 - Math.round(3/yBodyHalf*Math.abs(pointer.y - yBodyHalf))/100})`;

			canvasArr[2].style.transform = `
			translate(
				${Math.floor(11/xBodyHalf*(-pointer.x - xBodyHalf))}px,
				${Math.floor(11/yBodyHalf*(-pointer.y - yBodyHalf))}px) 
			scale(
				${1 - Math.round(2/xBodyHalf*Math.abs(pointer.x - xBodyHalf))/100},
				${1 - Math.round(2/yBodyHalf*Math.abs(pointer.y - yBodyHalf))/100})`;
		}
	};

	getPointerInput(handlePointer);
}

// ================
function setup() {
	const canvasArr = Array.from(document.querySelectorAll('.starfield'));
	const body = document.querySelector('body');

	const starfield = new Starfield(body, canvasArr);

	buildStarfields(body, canvasArr);

	let resizeId;
	function resize() {
		clearTimeout(resizeId);
		resizeId = setTimeout(() => buildStarfields(body, canvasArr), 500);
	}

	window.addEventListener("resize", resize);
}

window.addEventListener("load", setup);