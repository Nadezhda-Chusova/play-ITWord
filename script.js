/*КОНТЕНТ страницы ----------------------------------*/
/*f рандомнный выбор элемента из массива*/
function randomValueArray(array) {                            
    let random = Math.floor(Math.random()*array.length);     /*переменная= рандомный выбор числа из диапазона длины массива*/
    return array[random];                                   /*вернуть элемент массива по индексу-рандом*/
}

/********************************************************/
/*СЕКЦИЯ приветствие, знакомство: page-section__welcome*/

/*БЛОК 0: получение имени игрока, генерации имени хозяйки, вывод сообщения приветствия*/
/*ШАГ 1. переменные*/
let getNamePlayer = document.querySelector('.section__welcome input');    /*  переменная=обращение к полю ввода имени игрока*/
let namePlayer = 'XMEN';                                /*переменная= значению поля ввода getNamePlayer.value*/
let getNamePlayerBtn = document.querySelector('.section__welcome button'); 
let arrNameHost = ['Туча', 'Солнце', 'Ветер', 'Маша', 'Бэтмен', 'Халк', 'Дэдпул', 'Плуто', 'Гайка', 'Алиса', 'Электра', 'Чип', 'Джокер', 'ВВП'];  /*имя хозяина игры*/
let nameHost = document.querySelector('.namehost');    /*переменная=обращение к абзацу для записи имени хозяина игры*/
let story = document.querySelector('.story');         /*переменная=обращение к абзацу для записи истории с именем игрока*/
let welcome = document.querySelector('.section__welcome a');         /*переменная=обращение к абзацу*/
/*не использовала переменные
let getNamePlayerValue = getNamePlayer.value;
*/

/*ШАГ 2. проверка валидации и показ сообщения об ошибке при условии заданого  pattern=''*/
/*вариант 3 РАБОЧИЙ: задать в input разметке HTML pattern='' + JS + button разместили обработчик события onclick= вызов функции проверки*/
/*!!! ОШИБКА, после первой ошибки не дает ввести новое имя*/
getNamePlayer.addEventListener("input", function (event) {
    if (!getNamePlayer.checkValidity()) {       /*если инпут при проверке методом .checkValidity() не прошел валидацию (т.е. false, запускается событие invalid), показать окно ошибки*/
        getNamePlayer.setCustomValidity('Nick может состоять: ru, en, _, пробел, длиной до 16 знаков');  /*метод с сообщением об ошибке*/
        getNamePlayer.reportValidity();          /*!!!ВАЖНО сообщение отобразиться при вызове reportValidity() и не даст отправить форму*/
        getNamePlayer.value = '';                /*очищаем инпут для нового ввода*/                
    } else {
        getNamePlayer.setCustomValidity('');    /*!!!ВАЖНО setCustomValidity() метод пустой строкой. Это делает ввод действительным, поэтому форма будет отправлена..*/
    }
});

/*ВАРИАНТЫ валидации инпут, введенных данных
    oninvalid - обработчик события который обрабатывает invalid события, 
    invalid - событие возникает, когда элемент не прошел валидацию; 
    setCustomValidity - метод перезаписи текста ошибки браузера указанного всв-во validationMessage;
    event - интерфейс, любое событие, которое происходит в DOM;
    target - св-во event, является ссылкой на объект, который отправил события*/    

/*вариант 1: задать в input разметке HTML pattern='' + title (текст-ошибки)*/
/*вариант 2: задать в input разметке HTML pattern='' + JS (для изменения текста ошибки)
    /*getNamePlayer.oninvalid = function(event) {
        event.target.setCustomValidity('Nick может состоять: ru, en, _, пробел, длиной до 16 знаков');
    }*/
/*вариант 4: HTML pattern='' и др. + JS, обращение к .validity, которое является объектом ValidityState содержащим несколько св-в описывающих валидность элемента*
    getNamePlayer.addEventListener('keyup', function() {
        let validityState = getNamePlayer.validity;
        if (validityState.valid) {              /*Обращаемся к св-ву valid - в объекте validityState - в св-ве DOM validity; валидации true, если элемент соответствует всем ограничениям валидации и, следовательно, считается валидным*
            getNamePlayer.setCustomValidity('Введите другое значение!');   /*подсказка об ошибке*
        }
        if (validityState.patternMismatch) {   /*Возвращает true, если значение не соответствует шаблону, указанному в атрибуте pattern, и false если соответствует.*
            getNamePlayer.setCustomValidity('Введите другое значение!');  /*подсказка об ошибке*
        }
        else {
            getNamePlayer.setCustomValidity('');  /*!!!ВАЖНО установить сообщение в пустую строку, если ошибок нет. Пока сообщение об ошибке не будет пустым, форма не пройдет проверку и не будет отправлена.*
        }
        getNamePlayer.reportValidity();          /*!!!ВАЖНО вызвать reportValidity()метод для того же элемента, иначе ничего не произойдет, чтобы проверка прошла по всем элементам*
    })*/

/*вариант 5: JS, через регулярное выражение не дать ввести знаки не прошедшие валидацию
   keyup - событие, срабатывает, когда клавиша была отпущена.*
    getNamePlayer.addEventListener('keyup', function() {
        let regexName = /^[а-яёА-ЯЁa-zA-Z_0-9\s]{0,16}$/;   /*крилица, латинаца, _, \s - пробел, длиной 0-16 знаков*
        this.value = this.value.replace(regexName, '');     /*replace - метод замены с (не прошли валидацию) - на (пустую строку)*      
    })*/

/*вариант 6: JS, через регулярное выражение вывесит подсказку-ошибку не прошедшие валидацию*/
    /*getNamePlayer.addEventListener('keyup', function() {
        let regexName = /^[а-яёА-ЯЁa-zA-Z_0-9\s]{0,16}$/;   /*крилица, латинаца, _, \s - пробел, длиной 0-16 знаков*
        let NamePlayer = getNamePlayer.value;
        if(!regexName.test(NamePlayer.value)) {
            NamePlayer.setCustomValidity('Введите другое значение!');
            getNamePlayer.focus;   
        } else {
            NamePlayer.setCustomValidity('');      /*Данные прошли проверку, сбрасываем сообщение об ошибке.*          
        }
    })*/


/*ШАГ 3. обработчик событий на кнопку подтверждения - приветствие, после валидации поля ввода имени*/
getNamePlayerBtn.addEventListener('click', getNames);
function getNames() {
    /*получение имени хозяина игры*/
    getNameHost = randomValueArray(arrNameHost);
    nameHost.textContent = 'Я - ' + getNameHost;
    /*получение имени игрока*/
    if(getNamePlayer.value === '') {
        story.textContent = 'И так,  XMEN, можешь начать с правила игры,';
    } else { story.textContent = `И так,  ${getNamePlayer.value}, можешь начать с правила игры,`;}
    /*добавляем абзац с предложением начать игру*/
    welcome.textContent = 'а можешь жать на кнопку  "Поехали!"';
    namePlayer = getNamePlayer.value;
}


/**************************************************************** */
/*СЕКЦИЯ запуск игры, кнопка "Поехали": page-section__play = index.html*/

/*БЛОК 1: Таймер игры*/
//объявляем переменные
let base = 60; 
let clocktimer, dateObj, dh, dm, ds; 
let readout=''; 
let h=1, m=1, tm=1, s=0, ts=0, ms=0, init=0; 

//функция для очистки поля
function ClearСlock() { 
     clearTimeout(clocktimer); 
     h=1; m=1; tm=1; s=0; ts=0; ms=0; 
     init=0;
     readout='00:00:00.00'; 
     document.timerplay__form.stopwatch.value=readout; 
} 

//функция для старта секундомера
function StartTIME() { 
    let cdateObj = new Date();  //создаем объект с текущей датой и временем
    let t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
    if (t>999) { s++; } 
    if (s>=(m*base)) { 
             ts=0; 
             m++; 
    } else { 
             ts=parseInt((ms/100)+s); 
             if(ts>=base) { ts=ts-((m-1)*base); } 
    } 
     if (m>(h*base)) { 
             tm=1; 
             h++; 
    } else { 
             tm=parseInt((ms/100)+m); 
             if(tm>=base) { tm=tm-((h-1)*base); } 
    } 
    ms = Math.round(t/10); 
    if (ms>99) {ms=0;} 
    if (ms==0) {ms='00';} 
    if (ms>0&&ms<=9) { ms = '0'+ms; } 
    if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
    dm=tm-1; 
    if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
    dh=h-1; 
    if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
    readout = dh + ':' + dm + ':' + ds + '.' + ms; 
    document.timerplay__form.stopwatch.value = readout; 
    clocktimer = setTimeout("StartTIME()",1); 
} 
//Функция запуска и остановки
function StartStop() { 
    if (init==0){ 
        ClearСlock();
        dateObj = new Date(); 
        StartTIME(); 
        init=1; 
    } else { 
        clearTimeout(clocktimer);
        init=0;
    } 
} 
/******************************/

/*БЛОК 2: основные переменные*/
/*переменные - в счетчике раунд, строка 'Round 0'*/
let сountRound = document.querySelector('.countplay-round__order');   /*переменная= кол-во запуска новых игр, слов*/
let getCountRound = 0;                            /*переменная= счетчик кол-во нажатия на клавишу «Поехали»*/

/*переменные - в счетчике результата игры выиграно-проиграно, строка 'Round 0' => '0:0'*/
let resultPlayTrue = document.querySelector('.countplay-result__true');   /*переменная= кол-во отгаданных букв*/
let getResultPlayTrue = 0;                            /*переменная= счетчик кол-во отгаданных букв*/
let resultPlayFalse = document.querySelector('.countplay-result__false');   /*переменная= кол-во отгаданных букв*/
let getResultPlayFalse = 0;                            /*переменная= счетчик кол-во отгаданных букв*/

/*переменные - слово-вопрос*/
arrWords = ['атрибут', 'функция', 'тег', 'класс', 'цикл', 'итерация', 'конкатенация', 'оператор', 'переменная', 'объект', 'массив', 'строка', 'валидация', 'метод', 'объявление', 'вызов', 'замыкание', 'рекурсия', 'прототип'];
let startPlayBtn = document.querySelector('.section-play__start button');   /*переменная= кнопка «Поехали!»*/
let wordForLetterList = document.querySelector('.quizword-screen__list');   /*переменная= ul слово-вопрос*/
/*let wordForLetterItem = document.querySelector('.quizword-screen__list li');   /*переменная= буква li в ul слово-вопрос*/
let getWordRandom = '';                       /* переменная= слово-вопрос выбор через f random()*/
let longWordRandom = getWordRandom.length;    /* ОШИБКА НЕ РАБОТАЕТ  - переменная= длина слова -вопрос */
let getWordForLetter = [];                    /* переменная= arr букв, слово разбитое str.split('')*/
let letterItem= '';                           /*новая созданная переменная= li буква в слове-вопрос*/

/*переменные - счетчик общего кол-ва/угаданных букв в слове-вопрос, строка 'of letters 0:0'*/
let сountLettersAll = document.querySelector('.quizword-count__allleters');   /*переменная= общее кол-во, строка 'of letters 0:0'*/
let сountLetterTrue = document.querySelector('.quizword-count__trueleter' );   /*переменная= угаданная буква, строка 'of letters 0:0'*/
let getCountLettersAll = 0;                        /* переменная= кол-во букв в слове, строка 'of letters 0:0'*/
let getCountLetterTrue  = 0;                        /* переменная= кол-во угаданных букв в слове, строка 'of letters 0:0'*/

/*переменные - ввод буквы, открытие буквы в слове-вопрос, показ названных букв, счетчик открытых букв*/
let enterLetterBtn = document.querySelector('.quiz-letter__btn');       /*переменная= кнопка подтверждение ввода «Ок»*/
let enterLetterInput = document.querySelector('.quiz-letter__input');   /*переменная= поле ввода буквы*/
let getLetterInput = '';                                                /*переменная= значение-введенная буква*/
let arrEnterLetters = [];                                           /*переменная= значение-массив введенных букв*/
let collectionLetterTrueList = document.querySelector('.wordcollection-true__list');     /*переменная= ul коллекция-true*/
let collectionLetterTrueChildresItem = document.querySelector('.wordcollection-true__list li');  /*переменная= li в ul коллекция-true*/
let getCollectionLetterTrue = 0;                                      /*переменная= значение-введенная буква коллекция-true */
let collectionLetterFalseList = document.querySelector('.wordcollection-false__list');       /*переменная= ul коллекция-false*/
let collectionLetterFalseChildresItem = document.querySelector('.wordcollection-false__list li');      /*переменная= li в ul коллекция-false*/
let getCollectionLetterFalse = 0;                                      /*переменная= значение-введенная буква коллекция-false*/

/*переменные - в счетчике-бегунке ошибок*/
let countError = 0;                                /*переменная= счетчик ошибок*/
let startStepLong = 80;                           /*начало длины для перемещения цифры-ошибки для перемещения с бегунком */
let countErrorInput = document.querySelector('.count-error__label input');       /*переменная= инпут-бегунок*/
let countErrorDigit = document.querySelector('.count-error__label div');       /*переменная= показываек цифру ошибок*/

/*переменные - в словаре, после окончиня игры отображение слова-вопрос и переход по ссылке на сервис MDN Web Docs*/
objDictionary = {                                /*объект слово: URL*/
    атрибут: 'https://developer.mozilla.org/ru/docs/Glossary/Attribute', 
    функция: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions', 
    тег: 'https://developer.mozilla.org/ru/docs/Glossary/Tag', 
    класс: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes', 
    цикл: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Loops_and_iteration', 
    итерация: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Loops_and_iteration', 
    конкатенация: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/Strings#конкатенация_строк', 
    оператор: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators', 
    переменная: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/Variables', 
    объект: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object', 
    массив: 'https://developer.mozilla.org/ru/docs/Glossary/array',
    строка: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/First_steps/Strings', 
    валидация: 'https://developer.mozilla.org/ru/docs/Learn/Forms/Form_validation', 
    метод: 'https://developer.mozilla.org/ru/docs/Glossary/Method', 
    объявление: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#объявление_функций', 
    вызов: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#вызовы_функций', 
    замыкание: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#замыкания', 
    рекурсия: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#рекурсия', 
    прототип: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/Object_prototypes', 
    }
let dictionaryURL = '';                                            /*переменная= URL по ключу*/
let dictionaryWord = document.querySelector('.dictionary__word');  /*переменная= контент, для слова-вопрос в словаре*/
let dictionaryWordLink = document.querySelector('.dictionary__wordLink');  /*переменная= контент, для ссылки на сервис MDN*/

/******************************/

/*-----ТЕСТ *Выбор слова рандомно из массива*/
let gettestarr = document.querySelector('.testarr');  /*ВРЕМЕННО ВИЗУАЛИЗАЦИЯ результата ПРОВЕРКА*/
let gettestletter = document.querySelector('.testletter');  /*ВРЕМЕННО ВИЗУАЛИЗАЦИЯ результата ПРОВЕРКА*/
/*---------*/

/******************************/
/*БЛОК 3: ДЕЙСТВИЯ ПО КЛИКУ НА КНОПКУ ПОЕХАЛИ*/
/*Обработчик события при клике на клавишу «Поехали»*/
startPlayBtn.addEventListener('click', startNewPlay);   
function startNewPlay() {   

    /*1 ШАГ: действия в начале игры - стереть предыдущие данные*/
    enterLetterInput.disabled = false;           /*снимем блокировку с поля ввода буквы*/
    collectionLetterTrueList.innerHTML = '';     /*очищаем контент в строке коллекция-true названных букв*/
    collectionLetterFalseList.innerHTML = '';    /*очищаем контент в строке коллекция-false названных букв*/

    /*количество отгаданных букв в строке of letters 0:0*/
    getCountLetterTrue  = 0;                           /*переменная= обнуляем кол-во угаданных букв в слове, строка 'of letters 0:0'*/
    сountLetterTrue.textContent = getCountLetterTrue;  /*меняем контент разметки на =0, кол-во угаданных букв в слове, строка 'of letters 0:0'*/
    
    /*словарь показ слова-вопрос и ссылка на его значение на сайте МДН*/    
    dictionaryWord.textContent = '';            /*очищаем разметку - словарь, слово-вопрос*/
    dictionaryWordLink.textContent = '';        /*очищаем разметку - словарь, ссылка на значение слова на сайте МДН*/
   
    /*счетчик ошибок-бегунок*/
    countError = 0;                               /*счетчик ошибок - счетчик, цифру обнуляем*/
    countErrorInput.value = 0;                    /*счетчик ошибок - бегунок, возвращаем в начало, обнуляем,*/
    countErrorDigit.textContent = countError;      /*счетчик ошибок - контент, цифру обнуляем*/
    startStepLong = 80;                          /*счетчик ошибок - счетчик, длина отступа цифры от края*/
    countErrorDigit.style.width=`${startStepLong}px`;     /*счетчик ошибок - контент, цифру размещаем в начале под бегунком*/ 

    /*массив введенных букв прошлой игры*/
    arrEnterLetters = [];                        /*переменная= значение-массив введенных букв*/

    /*2 ШАГ: действия изменений данных при клике*/
    /*фокус на поле ввода буквы при нажатии на кнопку 'Поехали'*/
    enterLetterInput.focus();

    /*счетчик  раунд, строка Round 0*/
    getCountRound+=1;                         /*переменная= счетчик кол-во нажатия на клавишу «Поехали»*/
    сountRound.textContent = getCountRound;     /*добавляем значение-контент*/

    /*выбор слова-вопрос рандомно из массива*/ 
    getWordRandom = randomValueArray(arrWords);                 /*переменная = значению f-рандом с заданным массивом*/ 
    getWordForLetter = getWordRandom.split('');   /*получаем arr букв, слово-вопрос разбитое str.split('')*/ 

    /*в строку 'of letters 0:0' добавляем кол-во букв = длине слова-рандом, первое число*/
    getCountLettersAll = getWordRandom.length;                  /* кол-во букв в слове = длине слова*/
    сountLettersAll.textContent = getCountLettersAll;           /*добавляем значение-контент */           
    
    /*цикл перебора массива и показ карточек= кол-ву букв в слове-вопрос*/
    wordForLetterList.innerHTML='';                             /*удаляем макет слова из разметки*/                            
    for (let i=0; i<getWordForLetter.length; i++) {             /*проход по длине массива*/
        letterItem = document.createElement('li');              /*создаем li = кол-ву букв в слове-вопрос*/
        letterItem.textContent = 'X';                           /*в li добавляем = 'Х'*/
        letterItem.classList.add("quizword-screen__item-hover");  /*добавляем класс, для стилизации li:hover*/
        wordForLetterList.appendChild(letterItem);              /*в конец родителя ul добавляем li */        
    }   

    /*-----ТЕСТ, потом удалить*/
    gettestarr.textContent = getWordRandom;        /*добавляем значение-контент слово-рандом*/    
    gettestletter.textContent = getWordForLetter;  /*добавляем значение-контент массив-букв*/       
    /*---------*/
}

/***********************************************/
/*БЛОК 4 ввод буквы: ДЕЙСТВИЯ ПО КЛИКУ НА ИНПУТ, Enter, КНОПКУ ПОДТВЕРЖДЕНИЯ ВВОДА БУКВЫ, f-обработчик события:*
ШАГ 1: Обработчик события при клике на поле ввод буквы '.quiz-letter__input'*/
enterLetterInput.addEventListener('input', checkValidityLetter);                     /* input – событие при изменение значения в инпуте*/

let flagEnterLetterInput = false;                  /*флаг- показатель прохождения валидации буквы*/

function checkValidityLetter () {
    /*Проверка поля ввода буквы*/
    getLetterInput = enterLetterInput.value.toLowerCase();        /* e.target переменная= значение-буква из поля ввода + делаем букву строчной*/
    let checkLetterIsArr = arrEnterLetters.includes(getLetterInput);     /*проверка ранее буква не была введена, пройдена=false*/
    let regexLetter = /^[А-Яа-яЁё]{1,1}/.test(getLetterInput);     /*проверка по регулярному выражению (буква, русская, 1), пройдена=true*/

    if (regexLetter && !checkLetterIsArr) {       /*если рег.выражение=true  и  поиск в массиве=false*/
        enterLetterBtn.disabled = false;         /*отменить блокировку нажатия на кнопку*/
        flagEnterLetterInput = true;            /*меняем значения флага, разрешаем нажатие клавиши Enter*/

        /*enterLetterInput.setCustomValidity('');    /*!!!ВАЖНО setCustomValidity() метод пустой строкой. Это делает ввод действительным, поэтому форма будет отправлена..*/
    }
    else {                 
        enterLetterInput.value = '';             /*стираем значение инпута*/
        alert(`ОЙ! Буква '${getLetterInput}' отсутствует, или уже не новая, или не русская.  =)`);       /*показ окна об ошибке*/
        enterLetterInput.focus();                 /*возвращаем фокус на инпут*/
    }  
    /*!!! ОШИБКА как показать ошибку не через alert*/
    /*else { () => {
        enterLetterInput.setCustomValidity(`ОЙ! Буква '${getLetterInput}' уже не новая, или не русская.  =)`);  /*метод с сообщением об ошибке*
        enterLetterInput.reportValidity();          /*!!!ВАЖНО сообщение отобразиться при вызове reportValidity() и не даст отправить форму*
        enterLetterInput.value = '';                /*очищаем инпут для нового ввода*
    } }*/    
}
 
/*ШАГ 1: Обработчик события подтверждение буквы-ввод через отпускание (keyup) клавиши  Enter, при условии что буква прошла валидацию*/
enterLetterInput.addEventListener('keyup', (event) => {     
if ((event.key === 'Enter' || event.key === 'Return')  && flagEnterLetterInput) {      
    flagEnterLetterInput = false;        /*меняем значения флага, блокируем повторное нажатие клавиши Enter*/
    enterLetterBtn.disabled = true;     /*блокируем нажатие на кнопку*/
    getLetterUser();                   /*вызываем функцию резульата введенной буквы*/
}
});     

/*ШАГ 2: Обработчик события при клике на кнопку «Ok»*/
enterLetterBtn.addEventListener('click', () => {    
    getLetterUser();                               /*вызываем функцию резульата введенной буквы*/
    enterLetterBtn.disabled = true;                /*блокируем кнопку отправки*/    
})

function getLetterUser() {    
    arrEnterLetters.push(getLetterInput);    /*добавляем в массив введенную букву*/
    enterLetterInput.value ='';                            /*очищаем поле ввода от буквы*/ 
    /*проверка если есть буква-ввод в массиве букв заданного слова, тогда делаем...*/
    for(let i=0; i<getWordForLetter.length; i++) {
        if (getLetterInput === getWordForLetter[i]) {                      /*буква-выбор есть в массиве*/
            /*обращаемся к разметке к li[ind], добавляем букву в карточку и отменяем стилизацию :hover*/                     
            letterItem = wordForLetterList.children[i];                    /*обращаемся к дочке в ul, т.е. к li по определенному индексу*/
            letterItem.textContent = getLetterInput;                        /*в переменную-li добавляем контент букву-ввод*/
            letterItem.classList.remove("quizword-screen__item-hover");    /*удаляем класс, для стилизации li:hover, карточки не переварачиваются*/

            /*изменить цвет буквы в слове на видимый и заливку ячейки*/                     
            wordForLetterList.children[i].style.color = '#040307';
            wordForLetterList.children[i].style.background = '#ccb838f1';

            /*меняем счетчик отгаданных букв в слове строка of letters*/
            getCountLetterTrue += 1;                                             /*прибавить 1 к отгаданному кол-ву букв в строку 'of letters'*/ 
            сountLetterTrue.textContent = getCountLetterTrue;                    /*в li меняем число угаданных букв*/                                

            /*f достижения результа и окончания игры + метод отложенный старт*/
            setTimeout(getResultPlay, 1000);        /*метод задержки, отложенный старт на 1с*/    
        }
    }

    /*проверка если нет буквы-ввод в массиве, тогда делаем...*/
    if (getWordForLetter.includes(getLetterInput) === false) {                      /*буква-выбор нет в массиве*/
            alert(`ОЙ! Буква '${getLetterInput}' не живет в этом слове.  =)`);                  /*показ окна об ошибке*/            
            
            /*счетчик-бегунок ошибок*/
            countError +=1;                                     /*увеличиваем кол-во ошибок +1*/
            countErrorInput.value=`${countError}`;              /*шаг ползунока, меняем значение value = переход ползунка*/
            countErrorDigit.innerHTML=countError;               /*показываем кол-во ошибок*/
            startStepLong += 38;                                /*значение =увеличиваем длину div для перемещениячисло-ошибок под ползунком*/
            countErrorDigit.style.width=`${startStepLong}px`;   /*применяем стилизацию увеличения ширины div - двигаем цифру вслед за ползунком*/
            
            /*f достижения результа и окончания игры + метод отложенный старт*/
            setTimeout(getResultPlay, 1000);       /*метод задержки, отложенный старт на 1с*/            
                      

        /*ТЕСТ, потом удалить*/
        let testCont = document.querySelector('.testCont');
        testCont.textContent = countError;
        let testContTrue = document.querySelector('.testContTrue');
        testContTrue.textContent = getCountLetterTrue;
        let testFrrletters = document.querySelector('.testFrrletters');
        testFrrletters.textContent = arrEnterLetters;
        /*КОНЕЦ ТЕСТ*/   
    }  

     /*f добавления буквы-ввод в коллекцию true или false*/
     appendLetterCollection() 
    
}


/*ШАГ 3: f добавления буквы-ввод в коллекцию true или false*/
function appendLetterCollection() { 
    /*условие - буква-выбор есть в массиве, добавляем букву в коллекцию-true */
    if ( getWordForLetter.includes(getLetterInput) ) {                 
        let collectionLetterTrueItem = document.createElement('li');          /*создаем li*/                
        collectionLetterTrueItem.textContent = getLetterInput;                /*в li добавляем букву-верно в коллекцию-true*/                
        collectionLetterTrueList.appendChild(collectionLetterTrueItem);       /*в ul добавляем li */         
    }
    /*условие - буква-выбор нет в массиве, добавляем букву в коллекцию-false */
    if ( !getWordForLetter.includes(getLetterInput) ) {                 /*буква-выбор нет в массиве, добавляем букву в коллекцию-false*/
        let collectionLetterFalseItem = document.createElement('li');              /*создаем li*/
        collectionLetterFalseItem.textContent = getLetterInput;                    /*в li добавляем букву-ложь в коллекцию-false*/
        collectionLetterFalseList.appendChild(collectionLetterFalseItem);         /*в ul добавляем li */       
    }
    enterLetterInput.focus();                 /*возвращаем фокус на инпут*/
}


/*ШАГ 4: f наступления окончания игры и показ результата (5 ошибок / ошибок<5 и отгадано все слово)*/
function getResultPlay() {                     /*f достижения результа и окончания игры*/
    /*условие - если игрок допустил 5 ошибок при вводе букв*/
    if(countError >=5) {
        alert(`Эх, ${namePlayer}, ${namePlayer}...  Надо еще потренироваться!`);    /*namePlayer - имя игрока*/
        enterLetterInput.disabled = true;           /*ставим блокировку на поле ввода буквы*/
        getResultPlayFalse += 1;                    /*увеличиваем +1 число неотгаданных слов*/
        resultPlayFalse.textContent = getResultPlayFalse;  /*показываем в разметке количесвто неотгаданных слов*/

        getDictionaryWordUrl()                      /*f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN*/
    }
    /*условие - если игрок назвал все буквы слова и букв-ошибок менее 5*/
    if(countError < 5  &&  getCountLetterTrue === getWordRandom.length) {     /*getWordRandom = слово выбраное рандомно*/
        alert(`${namePlayer}, ЧЕМПИОН! ПОБЕДА!  =)`);    /*namePlayer - имя игрока*/
        enterLetterInput.disabled = true;           /*ставим блокировку на поле ввода буквы*/
        getResultPlayTrue += 1;                    /*увеличиваем +1 число неотгаданных слов*/
        resultPlayTrue.textContent = getResultPlayTrue;  /*показываем в разметке количесвто неотгаданных слов*/

        getDictionaryWordUrl()                         /*f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN*/
    }
}    

/********************************/
/*БЛОК 5: f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN (нажатие на кнопку подтверждения буквы 'Ok' + открыто слово/или 5 ошибок) */
function getDictionaryWordUrl() {
    dictionaryWord.textContent = `ITWord - ${getWordRandom}`;          /*подставляем слова-вопрос в словарь */    
    /*цикл поиска URL при совпадении слова-вопроса с ключем в объекте, URL=свойство  объекта*/
    for (var key in objDictionary) {                                   
        if(getWordRandom === key) {                   /*при совпадении слова-вопрос с ключем объекта*/
            dictionaryURL = objDictionary[key];                      /*переменной присвоить свойство объекта, т.е. URL*/
        }
    }
    dictionaryWordLink.href = dictionaryURL;                        /*укажем ссылку в атрибу href, для перехода на сервис MDN*/
    dictionaryWordLink.textContent = `Посмотреть значение...`;     /*подставляем ссылку на значение слова в словарь */
}

/******************************/
/*****************************/
/*СЦЕНАРИЙ действий:
БЛОК 0:  приветствие, знакомство:
=> назначаем переменные;
=> событие инпут, проверка поля ввода имени на валидацию:
    *если не проходит проверку - показываем сообщение об ошибке;
=> событие на кнопку подтверждения Ок:
    *f :
        **выбираем рандомно имя хозяина игры + помещаем в контент (визуализируем);
        **если в инпуте не введено имя играка указываем свой контент, если есть имя игрока указываем его;
        **добавляем контент приглашение к игре;
        **имя игрока фиксируем в переменной;
БЛОК 1:  таймер:        
БЛОК 2:  основные переменные:
БЛОК 3: начало игры: ДЕЙСТВИЯ ПО КЛИКУ НА КНОПКУ ПОЕХАЛИ, f-обработчик события:
=> стираем предыдущие данные:
    *снимаем блокировку с поля ввода буквы; 
    *очищаем контент-макет в ul коллекция названных букв true/false;
    *очищаем кол-во отгаданных букв в строке of letters 0:0(очищаем);
    *очищаем показ слова-вопрос и ссылка на его значение на сайте МДН;
    *очищаем счетчик ошибок-бегунок (цифру-контент, шаг ползунка, величину длины точки начала);
    *массив введенных букв прошлой игры;    
=> устанавливаем данные:
    *фокус на поле ввода буквы;
    *+1 в счетчике раунд, строка Round 0;
    *f выбираем рандомно слово-вопрос + из слова делаем массив букв;
    *в строку 'of letters 0(добавляем):0' добавляем кол-во букв = длине слова-рандом;
    *цикл показ макет-слова, кол-во карточек= кол-ву букв в слове-вопрос-рандом;
БЛОК 4: ввод буквы: ДЕЙСТВИЯ ПО КЛИКУ НА ИНПУТ, Enter, КНОПКУ ПОДТВЕРЖДЕНИЯ ВВОДА БУКВЫ, f-обработчик события:
=> событие на ввод в инпут:
    *полученную букву делаем строчно + проверяем была ли буква ранее введена + результат соответствия буквы на рег.выражение;
    *если буква соответствует проверкам:        
        **разблокируем кнопку Ок подтверждения;
        **флаг меняем значение, разрешаем сработать событию на нажатие  Enter;
    *если буква не соответствует проверкам, показываем сообщение об ошибке;
=> событие на клавшу подтвержждения Enter:
    *f результат ввода буквы;
    *блокировка кнопки подтверждения Ок;
    *флаг блокировка повторного нажатия Enter;
=> событие на подтверждение ввода буквы нажатием кнопки Ок:
    *блокируем повторное нажатие на кнопку подтверждения Ок
    *f результат ввода буквы.
=> f результат ввода буквы (перед этим: буква прошла валидацию, нажата кнопка Ок или клавиша Enter)
    *добавляем букву в arr введеных букв (если добавить букву в функции проверки валидация, то если ввести букву а потом ее стереть она все равно попадает в arr и потом ее уже ввести не получится);
    *очищаем инпут от введенной буквы;
    *цикл-перебор слова-вопрос на наличие буквы-ввода, если есть:
        **по i совпадения буквы, обращаемся к li по i в ul (к дочке) + вставляем букву-контент + убираем стилизацию hover;
        **стилизуем букву-совпадения: цвет, заливка;
        **+1 отгаданная буква с счетчик of letters;
        **отложенный старт f достижения результа и окончания игры;
    *если нет буквы-ввод в слове-вопрос:
        **окно с информацией об ошибке;
        **передвигаем бегунок с ошибкой: счетсик +1; показываем цифру; передвигаем на ширину;
        **отложенный старт f достижения результа и окончания игры;
    *f добавления буквы-ввод в коллекцию true или false;
=> f добавления буквы-ввод в коллекцию true или false:
    *если совпадение в true:
        **создаем li; **добавляем букву-контент; **добавляем li в ul;
    *если не совпадает в false:
        **создаем li; **добавляем букву-контент; **добавляем li в ul;
=> f наступления окончания игры и показ результата (5 ошибок / ошибок<5 и отгадано все слово)
    *если счетчик ошибок букв-ввод >=5:
        **окно с информацией об ошибке;
        **блокируем поле ввода буквы (инпут);
        **+1 в счетчике резульата 0:0(увеличиваем) + добавляем число в контент (визуализация);
        **f словарь, демонстрация слова-вопрос;
    *если счетчик ошибок букв-ввод <5 и кол-во букв-вод = кол-ву букв-слово-вопрос:
        **окно с информацией о победе;
        **блокируем поле ввода буквы (инпут);
        **+1 в счетчике резульата 0(увеличиваем):0 + добавляем число в контент (визуализация);
        **f словарь, демонстрация слова-вопрос;
БЛОК 5: словарь, демонстрация слова-вопрос и переход по ссылке на сайт МДН для просмотра теории:
=> f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN:
    *добавляем слово-вопрос в контент (визуализация);
    *цикл прохода по объекту поиска по ключу-слову = значение-ссылка на сайт;
    *добавляем в ссылку = в  href ссылку на сайт  +  текст-контент;
*/