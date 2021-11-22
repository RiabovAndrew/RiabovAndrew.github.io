const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

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
	new Result("Оцінка незадовільна! Повчи ще =)", 0),
	new Result("Непогано, але ще багато помилок...", 8),
	new Result("Добре!", 10),
	new Result("Ви знаєте тему бездоганно!", 13)
];

const questions = 
[
	new Question("Які стратегії необхідно виключити із розгляду у методі Неймана-Пірсона?", 
	[
		new Answer("Більші за допустиме граничне значення", 1),
		new Answer("Менші за допустиме граничне значення", 0),
		new Answer("Менші за допустиме граничне значення", 0),
		new Answer("Що не дорівнюють граничному значенню", 0)
	]),

	new Question("Формула переходу від матриці втрат до матриці жалю: ", 
	[
		new Answer("\\(s_{ij}=l_{ij}-\\displaystyle \\min_{i}l_{ij}\\)", 1),
		new Answer("\\(l_{ij}=s_{ij}-\\displaystyle\\min_{i}l_{ij}\\)", 0),
		new Answer("\\(s_{ij}=\\displaystyle\\min_{i}l_{ij}-l_{ij}\\)", 0),
		new Answer("\\(s_{ij}=\\displaystyle\\max_{i}l_{ij}-l_{ij}\\)", 0)
	]),
];

const quiz = new Quiz(1, questions, results);

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