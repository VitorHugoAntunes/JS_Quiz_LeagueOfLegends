// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

const finalSentences = [
    {
        sentence: 'Que pena!',
        color: '#FF0000',
    },
    {
        sentence: 'Muito bom!',
        color: '#FFFF00',
    },
    {
        sentence: 'Parabéns!',
        color: '#0D630D',
    }
]

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', restartEvent);

function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        let progressBarPercentage = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${progressBarPercentage}%`
        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question; 

        let optionsContent = '';
        for(let i in q.options){
            optionsContent += `<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsContent;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionCLickEvent);
        })
    } else {
        finishQuiz();
    }
}

function optionCLickEvent(event){
    let clickedOption = parseInt(event.target.getAttribute('data-op'));
    const clickOption = new Audio('./assets/audios/selectOption.wav'); 
    clickOption.play();

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    const finishedQuizAudio =  new Audio('./assets/audios/success.wav')
    finishedQuizAudio.play();

    let percentageOfCorrectQuestions = Math.floor((correctAnswers / questions.length) * 100);

    if(percentageOfCorrectQuestions < 30){
        document.querySelector('.scoreText1').innerHTML = `${finalSentences[0].sentence}`
        document.querySelector('.scorePct').style.color = `${finalSentences[0].color}`;
    } else if(percentageOfCorrectQuestions >= 30 && percentageOfCorrectQuestions < 70) {
        document.querySelector('.scoreText1').innerHTML = `${finalSentences[1].sentence}`
        document.querySelector('.scorePct').style.color = `${finalSentences[1].color}`;
    } else if(percentageOfCorrectQuestions >= 70) {
        document.querySelector('.scoreText1').innerHTML = `${finalSentences[2].sentence}`
        document.querySelector('.scorePct').style.color = `${finalSentences[2].color}`;
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${percentageOfCorrectQuestions}%`;
    document.querySelector('.scoreText2').innerHTML = `Respondeu ${questions.length} e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function restartEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}