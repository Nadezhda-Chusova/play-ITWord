/*КОНТЕНТ страницы ----------------------------------*/
/*f рандомнный выбор элемента из массива*/
function randomValueArray(array) {                            
    let random = Math.floor(Math.random()*array.length);     /*переменная= рандомный выбор числа из диапазона длины массива*/
    return array[random];                                   /*вернуть элемент массива по индексу-рандом*/
}

/*ОШИБКА - при новом нажатии на кнопку, имя хозяина буква*/
/*СЕКЦИЯ приветствие, знакомство: page-section__welcome*/
/*Сценарий: получение имени игрока и генерации имени хозяйки*/
let getNamePlayer = document.querySelector('.section__welcome input');    /*переменная=обращение к полю ввода имени игрока*/
let namePlayer = 'XMEN';                                /*переменная= значению поля ввода getNamePlayer.value*/
let getNamePlayerBtn = document.querySelector('.section__welcome button'); 
let arrNameHost = ['Туча', 'Солнце', 'Ветер', 'Маша', 'Бэтмен', 'Халк', 'Дэдпул', 'Плуто', 'Гайка', 'Алиса', 'Электра', 'Чип', 'Джокер', 'ВВП'];  /*имя хозяина игры*/
let nameHost = document.querySelector('.namehost');    /*переменная=обращение к абзацу для записи имени хозяина игры*/
let story = document.querySelector('.story');         /*переменная=обращение к абзацу для записи истории с именем игрока*/
let welcome = document.querySelector('.section__welcome a');         /*переменная=обращение к абзацу 
/*обработчик событий*/
getNamePlayerBtn.addEventListener('click', getNames);
function getNames() {
    /*получение имени хозяина игры*/
    arrNameHost = randomValueArray(arrNameHost);
    nameHost.textContent = 'Я - ' + arrNameHost;
    /*получение имени игрока*/
    if(getNamePlayer.value === '') {
        story.textContent = 'И так,  XMEN, можешь начать с правила игры,';
    } else { story.textContent = `И так,  ${getNamePlayer.value}, можешь начать с правила игры,`;}
    /*добавляем абзац с предложением начать игру*/
    welcome.textContent = 'а можешь жать на кнопку…';
    namePlayer = getNamePlayer.value;
}

/**************************************************************** */
/*СЕКЦИЯ запуск игры: page-section__play = index.html*/

/*Таймер игры*/
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

/**************************************************************** */
/*СЕКЦИЯ запуск игры: page-section__play = index.html*/

/*переменные - в счетчике раунд, строка 'Round 0'*/
let сountRound = document.querySelector('.countplay-round__order');   /*переменная= кол-во запуска новых игр, слов*/
let getCountRound = 0;                            /*переменная= счетчик кол-во нажатия на клавишу «Поехали»*/

/*переменные - в счетчике результата игры выиграно-проиграно, строка 'Round 0' => '0:0'*/
let resultPlayTrue = document.querySelector('.countplay-result__true');   /*переменная= кол-во отгаданных букв*/
let getResultPlayTrue = 0;                            /*переменная= счетчик кол-во отгаданных букв*/
let resultPlayFalse = document.querySelector('.countplay-result__false');   /*переменная= кол-во отгаданных букв*/
let getResultPlayFalse = 0;                            /*переменная= счетчик кол-во отгаданных букв*/

/*переменные - слово-вопрос*/
arrWords = ['атрибут', 'функция', 'тег', 'класс', 'цикл', 'итерация', 'конкатенация', 'оператор', 'переменная', 'объект', 'массив', 'строка', 'валидация', 'метод', 'объявление', 'вызов', 'замыкания', 'рекурсия', 'прототип'];
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
    замыкания: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#замыкания', 
    рекурсия: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#рекурсия', 
    прототип: 'https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/Object_prototypes', 
    }
let dictionaryURL = '';                                            /*переменная= URL по ключу*/
let dictionaryWord = document.querySelector('.dictionary__word');  /*переменная= контент, для слова-вопрос в словаре*/
let dictionaryWordLink = document.querySelector('.dictionary__wordLink');  /*переменная= контент, для ссылки на сервис MDN*/

/***********************************************/
/*ДЕЙСТВИЯ ПО КЛИКУ НА КНОПКУ ПОЕХАЛИ*/
/*В f-обработчик события при клике на клавишу для старта игры 'Поехали' =>
=> снимаем блокировку с поля ввода буквы;
=> очищаем контент-макет в ul коллекция названных букв true/false;
=> меняем число раунда +1, т.е. кол-во игр;
=> f выбираем рандомно слово-вопрос + из слова делаем массив букв;
=> цикл по массиву слово-вопрос: удаляем контент-макет в ul, размещаем буквы в li в разметку ul (цвет бесцветный);
*/

/*Выбор слова рандомно из массива*/
/*-----ТЕСТ */
let gettestarr = document.querySelector('.testarr');  /*ВРЕМЕННО ВИЗУАЛИЗАЦИЯ результата ПРОВЕРКА*/
let gettestletter = document.querySelector('.testletter');  /*ВРЕМЕННО ВИЗУАЛИЗАЦИЯ результата ПРОВЕРКА*/
/*---------*/

/*Обработчик события при клике на клавишу «Поехали»*/
startPlayBtn.addEventListener('click', startNewPlay);   
function startNewPlay() {   

    /*действия для начала игры, стереть предыдущие данные*/
    enterLetterInput.disabled = false;           /*снимем блокировку с поля ввода буквы*/
    collectionLetterTrueList.innerHTML = '';     /*очищаем контент в строке коллекция-true названных букв*/
    collectionLetterFalseList.innerHTML = '';    /*очищаем контент в строке коллекция-true названных букв*/
    getCountLetterTrue  = 0;                      /*переменная= обнуляем кол-во угаданных букв в слове, строка 'of letters 0:0'*/
    countError = 0;                               /*счетчик ошибок - счетчик, цифру обнуляем*/
    countErrorInput.value = 0;                    /*счетчик ошибок - бегунок, возвращаем в начало, обнуляем,*/
    countErrorDigit.textContent = countError;      /*счетчик ошибок - контент, цифру обнуляем*/
    startStepLong = 80;                          /*счетчик ошибок - счетчик, длина отступа цифры от края*/
    countErrorDigit.style.width=`${startStepLong}px`;     /*счетчик ошибок - контент, цифру размещаем в начале под бегунком*/ 

    /*счетчик  раунд, строка Round 0*/
    getCountRound+=1;                         /*переменная= счетчик кол-во нажатия на клавишу «Поехали»*/
    сountRound.textContent = getCountRound;     /*добавляем значение-контент*/

    /*выбор слова рандомно из массива*/ 
    getWordRandom = randomValueArray(arrWords);                 /*переменная = значению f-рандом с заданным массивом*/ 
    
    /*в строку 'of letters 0:0' добавляем кол-во букв = длине слова-рандом*/
    getCountLettersAll = getWordRandom.length;                  /* кол-во букв в слове = длине слова*/
    сountLettersAll.textContent = getCountLettersAll;           /*добавляем значение-контент */

    /*получаем arr букв, слово разбитое str.split('')*/ 
    getWordForLetter = getWordRandom.split('');        

    /*цикл перебора массива и показ слово-вопрос со скрытыми буквами*/
    wordForLetterList.innerHTML='';                             /*удаляем макет слова из разметки*/                            
    for (let i=0; i<getWordForLetter.length; i++) {             /*проход по длине массива*/
        letterItem = document.createElement('li');              /*создаем li*/
        letterItem.textContent = getWordForLetter[i];          /*в li добавляем букву = el[i]*/
        wordForLetterList.appendChild(letterItem);              /*в конец родителя ul добавляем li */
        /*letterItem.style.color = "#0f0831";                   /*-----ТЕСТ, потом удалить : цвет тексту букв в слове-вопрос, для визуализации*/
    }   
    
    /*-----ТЕСТ, потом удалить*/
    gettestarr.textContent = getWordRandom;        /*добавляем значение-контент слово-рандом*/    
    gettestletter.textContent = getWordForLetter;  /*добавляем значение-контент массив-букв*/       
    /*---------*/
}

/***********************************************/
/*ДЕЙСТВИЯ ПО КЛИКУ НА КНОПКУ ПОДТВЕРЖДЕНИЯ ВВОДА БУКВЫ Ok*/
/*В f-обработчик события при клике на клавишу подтверждения буквы игроком 'Ok' =>
=> получаем значение-букву из поля ввода Letter игроком;
=> цикл по массиву слово-вопрос: 
        1-е условие: буква-ввод есть в массиве = букву в слове делаем видимой (цвет) + увеличиваем +1 в поле кол-во открытых букв строка 'of letters' + добавляем букву в коллекцию true;
        2-е условие: буква-ввод нет в массиве = увеличиваем +1 в поле-бегунок ошибок + добавляем букву в коллекцию false;
*/

/*Обработчик события при клике на клавишу «Ok»*/
enterLetterBtn.addEventListener('click', getLetterUser);
function getLetterUser() {

    getLetterInput = enterLetterInput.value.toLowerCase();     /*переменная= значение-буква из поля ввода + делаем букву строчной строчной*/
    enterLetterInput.value ='';                                /*очищаем поле ввода от буквы*/

    /*проверка если есть буква-ввод в массиве, тогда делаем...*/
    for(let i=0; i<getWordForLetter.length; i++) {
        if (getLetterInput === getWordForLetter[i]) {                      /*буква-выбор есть в массиве*/
                /*изменить цвет буквы в слове на видимый и заливку ячейки*/                     
                wordForLetterList.children[i].style.color = '#040307';
                wordForLetterList.children[i].style.background = '#ccb838f1';

                /*меняем счетчик отгаданных букв в слове строка of letters*/
                getCountLetterTrue += 1;                                             /*прибавить 1 к отгаданному кол-ву букв в строку 'of letters'*/ 
                сountLetterTrue.textContent = getCountLetterTrue;                    /*в li меняем число угаданных букв*/  

                /*добавляем букву в коллекцию true*/
                let collectionLetterTrueItem = document.createElement('li');          /*создаем li*/                
                collectionLetterTrueItem.textContent = getLetterInput;                /*в li добавляем букву-верно в коллекцию-true*/
                /*collectionLetterTrueItem.style.color = 'rgba(252, 245, 251, 0.699)';                     /*меняем цвет букв на видимый в в коллекции-true*/
                collectionLetterTrueList.appendChild(collectionLetterTrueItem);       /*в ul добавляем li */ 

                /*f достижения результа и окончания игры*/
                getResultPlay();

            /*ОШИБКА КОД НИЖЕ НЕ РАБОТАЕТ, создается лист с буквой по каждой итерации*/           
            /*} if (getLetterInput !=== getWordForLetter[i]) {                 /*буква-выбор нет в массиве*
            /*добавляем букву в коллекцию-false*
            let collectionLetterFalseItem = document.createElement('li');              /*создаем li*
            collectionLetterFalseItem.textContent = getLetterInput;                    /*в li добавляем букву-ложь*
            collectionLetterFalseList.appendChild(collectionLetterFalseItem);         /*в ul добавляем li */
        }
    } 
    /*проверка если нет буквы-ввод в массиве, тогда делаем...*/
    if (getWordForLetter.includes(getLetterInput) === false) {                 /*буква-выбор нет в массиве*/
            /*добавляем букву в коллекцию-false*/
            let collectionLetterFalseItem = document.createElement('li');              /*создаем li*/
            collectionLetterFalseItem.textContent = getLetterInput;                    /*в li добавляем букву-ложь в коллекцию-false*/
            /*collectionLetterFalseItem.style.color = 'rgba(209, 196, 233, 0.342)';                         /*меняем цвет букв на видимый в коллекции-false*/
            collectionLetterFalseList.appendChild(collectionLetterFalseItem);         /*в ul добавляем li */
            alert(`ОЙ! Буква '${getLetterInput}' не живет в этом слове.  =)`);                  /*показ окна об ошибке*/
            
            /*счетчик-бегунок ошибок*/
            countError +=1;                         /*увеличиваем кол-во ошибок +1*/
            countErrorInput.value=`${countError}`;   /*шаг ползунока, меняем значение value = переход ползунка*/
            countErrorDigit.innerHTML=countError;    /*показываем кол-во ошибок*/
            startStepLong += 38;                   /*значение =увеличиваем длину div для перемещениячисло-ошибок под ползунком*/
            countErrorDigit.style.width=`${startStepLong}px`;     /*применяем стилизацию увеличения ширины div - двигаем цифру вслед за ползунком*/
            
            /*f достижения результа и окончания игры*/
            getResultPlay();

    /*ТЕСТ, потом удалить*/
    let testCont = document.querySelector('.testCont');
    testCont.textContent = countError;
    let testContTrue = document.querySelector('.testContTrue');
    testContTrue.textContent = getCountLetterTrue;
    /*КОНЕЦ ТЕСТ*/   
    }  
    
}
/***********************************************/

/*f события наступления окончания игры и показ результата (5 ошибок / ошибок<5 и отгадано все слово*/
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
    if(countError < 5  &&  getCountLetterTrue=== arrWords.length) {  /*namePlayer - имя игрока*/
        alert(`${namePlayer}, ЧЕМПИОН! ПОБЕДА!  =)`); 
        enterLetterInput.disabled = true;           /*ставим блокировку на поле ввода буквы*/
        getResultPlayTrue += 1;                    /*увеличиваем +1 число неотгаданных слов*/
        resultPlayTrue.textContent = getResultPlayTrue;  /*показываем в разметке количесвто неотгаданных слов*/

        getDictionaryWordUrl()                         /*f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN*/
    }
}    

/*f словарь, демонстрация слова-вопрос и URL для просмотра его знацения на сайте MDN (нажатие на кнопку подтверждения буквы 'Ok' + открыто слово/или 5 ошибок) */
function getDictionaryWordUrl() {
    dictionaryWord.textContent = `ITWord - ${getWordRandom}`;          /*подставляем слова-вопрос в словарь */    
    /*цикл поиска URL при совпадении слова-вопроса с ключем в объекте, URL=свойство  объекта*/
    for (var key in objDictionary) {                                   
        if(getWordRandom === objDictionary[key]) {                   /*при совпадении слова-вопрос с ключем объекта*/
            dictionaryURL = objDictionary[key];                      /*переменной присвоить свойство объекта, т.е. URL*/
        }
    }
    dictionaryWordLink.href = dictionaryURL;                                  /*укажем ссылку в атрибу href, для перехода на сервис MDN*/
    dictionaryWordLink.textContent = `Посмотреть значение...`;     /*подставляем ссылку на значение слова в словарь */
}