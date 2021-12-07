const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Quiz
{
	constructor(type, questions, results)
	{
		//test type: 1 - with correct aswers; 2 - without
		this.type = type;
		this.questions = questions;
		this.results = results;
		this.score = 0;
		this.result = 0;
		this.current = 0;
	}

	Click(index)
	{

		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

const results = 
[
	new Result("Оцінка незадовільна! Повчи ще =)<br/><a style=\"text-decoration: none;\" href=\"\\\">Перейти до теорії</a>", 0),
	new Result("Непогано, але ще багато помилок...<br/><a style=\"text-decoration: none;\" href=\"\\\">Перейти до теорії</a>", 5),
	new Result("Добре!<br/><a style=\"text-decoration: none;\" href=\"\\\">Перейти до теорії</a>", 7),
	new Result("Ви знаєте тему бездоганно!<br/><a style=\"text-decoration: none;\" href=\"\\\">Перейти до теорії</a>", 10)
];

var questions = 
[
	// question with solves

	//1
	new Question("Формула переходу від матриці втрат до матриці жалю: ", 
	[
		new Answer("<img src=\"images/answer1-1.png\">", 1),
		new Answer("<img src=\"images/answer1-2.png\">", 0),
		new Answer("<img src=\"images/answer1-3.png\">", 0),
		new Answer("<img src=\"images/answer1-4.png\">", 0)
	]),
	//2
	new Question("<img src=\"images/q2-2.png\"> <img src=\"images/q2.png\"> <img src=\"images/q2-3.png\"> ", 
	[
		new Answer("<img src=\"images/answer2-1.png\">", 0),
		new Answer("<img src=\"images/answer2-2.png\">", 0),
		new Answer("<img src=\"images/answer2-3.png\">", 1),
		new Answer("<img src=\"images/answer2-4.png\">", 0),
	]),
	//3
	new Question("Чому геометрично відповідає перехід від матриці втрат до матриці жалю?", 
	[
		new Answer("Паралельному перенесенню координат до перетинання платіжної множини", 0),
		new Answer("Паралельному перенесенню координат до їх дотику з платіжною множиною", 1),
		new Answer("Паралельному перенесенню координат до дотику осі абцис з платіжною множиною", 0),
		new Answer("Паралельному перенесенню координат до дотику осі ординат з платіжною множиною", 0)
	]),
	//4
	new Question("Якої форми клин при рандомізованому розв’язку? ", 
	[
		new Answer("90°", 1),
		new Answer("45°", 0),
		new Answer("135°", 0),
		new Answer("180°", 0)
	]),
	//5
	new Question("<img src=\"images/q5.png\">", 
	[
		new Answer("Знайти в кожному ряді найменший елемент та додати його до кожного елемента даного ряду", 0),
		new Answer("Знайти в кожному стовпці найбільший елемент та відняти його від кожного елемента даного стовпця", 0),
		new Answer("Знайти в кожному стовпці найменший елемент та відняти його від кожного елемента даного стовпця", 1),
		new Answer("Знайти в кожному ряді найбільший елемент та відняти його від кожного елемента даного ряду", 0)
	]),
	//6
	new Question("Якій характеристиці відповідає «Критерія оптимальності Севіджа»?", 
	[
		new Answer("Критерій оптимальності Севіджа відповідає поведінці особи, яку мучать докори сумління щодо вдалого вибору стратегії", 0),
		new Answer("Критерій оптимальності Севіджа відповідає поведінці особи, яку мучать докори сумління щодо невдалого вибору стратегії", 1),
		new Answer("Критерій оптимальності Севіджа відповідає поведінці особи, яку не мучать докори сумління щодо невдалого вибору стратегії", 0),
		new Answer("Критерій оптимальності Севіджа відповідає поведінці особи, яку не мучать докори сумління щодо вдалого вибору стратегії", 0),
	]),
	//7
	new Question("В алгоритмі пошуку нерандомізованого розв’язку за критерієм Севіджа, обирають як розв’язок: ", 
	[
		new Answer("<img src=\"images/answer7-1.png\">", 0),
		new Answer("<img src=\"images/answer7-2.png\">", 0),
		new Answer("<img src=\"images/answer7-3.png\">", 0),
		new Answer("<img src=\"images/answer7-4.png\">", 1)
	]),
	//1
	new Question("Які стратегії необхідно виключити із розгляду у методі Неймана-Пірсона?", 
	[
		new Answer("Яким відповідають втрати, більші за граничне значення", 1),
		new Answer("Яким відповідають втрати, менші за граничне значення", 0),
		new Answer("Яким відповідають втрати, що дорівнюють граничному значенню", 0),
		new Answer("Яким відповідають втрати, що не дорівнюють граничному значенню", 0),
	]),
	//2
	new Question("Критерій Неймана-Пірсонали застосовується коли природа знаходиться у 2 станах: ", 
	[
		new Answer("1-ший та 2-ий стани  не можна контролювати", 0),
		new Answer("1-ший стан не можна контролювати, 2-ий стан  можна контролювати", 0),
		new Answer("1-ший стан можна контролювати, 2-ий стан не можна контролювати", 1),
		new Answer("1-ший та 2-ий стани  можна контролювати", 0),
	]),
	//3
	new Question("Чим відрізняється алгоритм рандомізованого розв'язоку від нерандомізованого? ", 
	[
		new Answer("Нічим", 0),
		new Answer("Будується геометрична інтерпретації критерію в алгоритмі рандомізованого розв'язку", 1),
		new Answer("Будується геометрична інтерпретації критерію в алгоритмі нерандомізованого розв'язку", 0),
	]),
	//4
	new Question("За критерієм Неймана-Пірсона, який з розв’язків вважають кращим? ", 
	[
		new Answer("Для якого втрати для стану, що не контролюється, менші", 1),
		new Answer("Для якого втрати для стану, що не контролюється, більші", 0),
		new Answer("Обидва вважаються однаково кращими", 0),
		new Answer("Обидва вважаються однаково кращими лише за умови, якщо втрати для стану, що не контролюється, більші хоча б в одному з них", 0),
	]),
	//5
	new Question("У алгоритмі пошуку рандомізованого розв’язку на другому кроці треба видалити із платіжної матриці точки: ", 
	[
		new Answer("Для яких значення за станом, що контролюється, менше за граничне", 0),
		new Answer("Для яких значення за станом дорівнює граничному", 0),
		new Answer("Для яких значення за станом, що контролюється, більше за граничне", 1),
		new Answer("Для яких значення за станом протилежне до граничного", 0),
	]),
	//6
	new Question("Якщо граничне значення контрольованого стану за критерієм Неймана-Пірсона буде меньше за будь яку втрату контрольованого стану, це означає:", 
	[
		new Answer("Що будь яка стратегія є оптимальною", 0),
		new Answer("Що жодна стратегія не є оптимальною за критерієм Неймана-Пірсона", 1),
		new Answer("Що тільки одна стратегія є оптимальною", 0),
		new Answer("Що існує якнайменш одна оптимальна стратегія", 0),
	]),

];

const quiz = new Quiz(
	1, 
	questions
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
		.slice(0, 10), 
	results
);

Update();

function Update()
{
	
	if(quiz.current < quiz.questions.length) 
	{
		headElem.innerHTML = quiz.questions[quiz.current].text;
		buttonsElem.innerHTML = "";

		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);
			Array.from(btn.children).forEach(element => {
				element.setAttribute("index", i)
			});

			buttonsElem.appendChild(btn);
		}
		
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
		
		Array.from(btns[i].children).forEach(element => {
			element.addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
		});
	}	
}

function Click(index) 
{
	let correct = quiz.Click(index);
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		btns[index].className = "button button_correct";
	}

	setTimeout(Update, 1000);
}