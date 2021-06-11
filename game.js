//alert('Welcome to the game!')
let field = document.querySelector('.field');
let squares = document.getElementsByClassName('squares'); 
/*
for(let i = 0; i < 9; i++){
	let squares = document.createElement('div');
	squares.classList.add('squares');
	field.append(squares);
}
*/
let imgN = document.querySelector('.imgN1'); 
let imgS = document.querySelector('.imgS1');
let res = document.querySelector('.res');
let btn = document.querySelector('.button');
let step = 0;
let winner;


//Потому что getElementsByClassName возвращает коллекцию элементов, а у коллекции нет метода addEventListener
// document.querySelectorAll() - NodeList
// document.getElementsByClassName() - HTMLCollection 


field.addEventListener('click', move);

function move(e){
	if (e.target.innerHTML === ''){
		if(step % 2 == 0){
			e.target.innerHTML = '1';
			e.target.classList.add('one');
		} else {
			e.target.innerHTML = '0';
			e.target.classList.add('zero');
		}
		step++;
		win();
	}
}

function win(){
	let match = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; 
	for(let j = 0; j < match.length; j++){
		if (squares[match[j][0]].innerHTML === '1' && 
			squares[match[j][1]].innerHTML === '1' && 
			squares[match[j][2]].innerHTML === '1'){
				setTimeout(()=> {
					squares[match[j][0]].classList.add('active');
					squares[match[j][1]].classList.add('active');
					squares[match[j][2]].classList.add('active');
					res.innerText = 'Neo won';
					winner = true; // дать условие для ничьи
					imgN.classList.remove('imgN1');  
					imgN.classList.add('imgN2');
				}, 500);	
				field.removeEventListener('click', move);
			} else if(squares[match[j][0]].innerHTML === '0' &&
					squares[match[j][1]].innerHTML === '0' && 
					squares[match[j][2]].innerHTML === '0'){
						setTimeout(()=> {
							squares[match[j][0]].classList.add('active');
							squares[match[j][1]].classList.add('active');
							squares[match[j][2]].classList.add('active');
							res.innerText = 'Smith won';
							winner = true;
							imgS.classList.remove('imgS1');
							imgS.classList.add('imgS2');
						}, 500);	
				field.removeEventListener('click', move);				
			}	else if(step === 9){ // (step == 9 && !winner) если это 9й шаг, и winner=false, тогда ничья
					res.innerText = 'Nobody won';			
				}
	}
}

btn.addEventListener('click', newGame);

function newGame(){
	step = 0;
	res.innerText = ''; 
	for (let i = 0; i < squares.length; i++) { 
            squares[i].innerHTML = '';
			squares[i].classList.remove('active');
        }
	field.addEventListener('click', move); 
	imgN.classList.remove('imgN2');
	imgN.classList.add('imgN1');
	imgS.classList.remove('imgS2');
	imgS.classList.add('imgS1');	
	}


