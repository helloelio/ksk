//              кнопка *добавить*

const openCardButton = document.querySelector('.add-button');

//              модальное окно(окно добавления)

const createMenu = document.querySelector('.modal');

//              кнопка закрытия модального окна

const closeModalButton = document.querySelector('.close');

//              блок с кнопками карты

const cardMenuBtns = document.querySelectorAll('.menu-btn');

//              окно редактирования для карточки

const editMenus = document.querySelectorAll('.edit-modal');

//              блок с карточками

const cards = document.querySelector('.cards');

//              строка ввода данных в модальном окне добавления

//              кнопка 'добавить' в модальном окне добавления
const inputCardNumber = document.getElementById('card-number');

const createCardButton = document.querySelector('.create-card');

//              открытие модального окна добавления "товара"

let openCardMenu = () => {
    createMenu.style.display = 'flex';
    // set attribute disable to button 'add' by default
    createCardButton.setAttribute('disabled', 'dissabled');
    // event listener by keydown changes
    inputCardNumber.addEventListener('keydown', () => {
        // condition for empty string in input
        //TODO: add select condition
        if (inputCardNumber.value == ' ' || null) {
            createCardButton.setAttribute('disabled', 'dissabled');
        } else {
            createCardButton.removeAttribute('disabled');
        }
    });
};

//              закрытие модального окна добавления нажатием на "крестик x"

let closeCardMenuByButton = () => {
    createMenu.style.display = 'none';
    inputCardNumber.value = '';
};

//              закрытие модального окна добавления нажатием на кнопку `Escape` "

let closeCardMenuByKey = (event) => {
    if (event.key == 'Escape') {
        createMenu.style.display = 'none';
    }
};

let count = 1;

let createCard = () => {
    // card item
    let cardItem = document.createElement('div');
    cardItem.classList.add('cards__item');
    cardItem.classList.add(`card-${count}`);
    // card header
    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card__header');
    // card body
    let cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    // card body id
    let cardBodyId = document.createElement('div');
    cardBodyId.classList.add('card__id');
    cardBodyId.textContent = `ID: ${count}`;
    // card body date
    let cardBodyDate = document.createElement('div');
    cardBodyDate.classList.add('card__date');
    let currentDate = new Date();
    let formatedDate =
        currentDate.getDate() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getFullYear();
    cardBodyDate.innerHTML = `Дата создания: ${formatedDate}`;
    // card body type
    let cardBodyType = document.createElement('div');
    cardBodyType.classList.add('card__type');
    let selectOptionType = document.getElementById('create-select');
    cardBodyType.innerHTML = `Тип: ${selectOptionType.value}`;

    // card name
    let cardName = document.createElement('div');
    cardName.classList.add('card__name');
    cardName.textContent = inputCardNumber.value;

    // card buttons
    let cardButtons = document.createElement('div');
    cardButtons.classList.add('card__buttons');

    // card buttons -> drag-button
    let dragBtn = document.createElement('button');
    dragBtn.classList.add('drag-btn');
    let dragImg = document.createElement('img');
    dragImg.src = './icons/move.png';
    dragBtn.appendChild(dragImg);

    // card buttons -> menu-button
    let cardMenuBtn = document.createElement('button');
    cardMenuBtn.classList.add('menu-btn');
    cardMenuBtn.classList.add(`btn-${count}`);
    let cardMenuImg = document.createElement('img');
    cardMenuImg.src = './icons/menu.png';
    cardMenuBtn.appendChild(cardMenuImg);
    inputCardNumber.value = '';
    createMenu.style.display = 'none';

    // create modal
    let editModal = document.createElement('div');
    editModal.classList.add('edit-modal');
    editModal.classList.add(`edit-modal-${count}`);
    // edit button
    let editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    let editButtonImg = document.createElement('img');
    editButtonImg.src = './icons/edit.png';
    editButtonImg.style.marginRight = '10px';
    let editButtonText = document.createElement('span');
    editButtonText.textContent = 'редактировать';
    //
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    let deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './icons/close.png';
    deleteButtonImg.style.marginRight = '10px';
    let deleteButtonText = document.createElement('span');
    deleteButtonText.textContent = 'удалить';
    //
    editButton.appendChild(editButtonImg);
    editButton.appendChild(editButtonText);
    deleteButton.appendChild(deleteButtonImg);
    deleteButton.appendChild(deleteButtonText);
    editModal.appendChild(editButton);
    editModal.appendChild(deleteButton);
    cardButtons.appendChild(editModal);

    // formating card body
    cardBody.appendChild(cardBodyId);
    cardBody.appendChild(cardBodyDate);
    cardBody.appendChild(cardBodyType);
    selectOptionType.value = selectOptionType[0];

    // добавление кнопок в 'голову карты'
    cardButtons.appendChild(dragBtn);
    cardButtons.appendChild(cardMenuBtn);

    // создание 'головы' карты
    cardHeader.appendChild(cardName);
    cardHeader.appendChild(cardButtons);

    // Создание карты
    cardItem.appendChild(cardHeader);
    cardItem.appendChild(cardBody);

    // добавление карты в блок cards
    cards.appendChild(cardItem);

    // open menu to drag/delete
    cardMenuBtn.addEventListener('click', (event) => {
        editModal.classList.toggle('edit-modal-flex');
    });

    // drag card by button
    let currentDroppable = null;
    dragBtn.addEventListener('mousedown', (event) => {
        let shiftX = event.clientX - cardItem.getBoundingClientRect().left;
        let shiftY = event.clientY - cardItem.getBoundingClientRect().top;
        cardItem.style.position = 'absolute';
        cardItem.style.zIndex = 1000;
        cards.append(cardItem);
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
            cardItem.style.left = pageX - shiftX + 'px';
            cardItem.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            cardItem.hidden = true;
            let elemBelow = document.elementFromPoint(
                event.clientX,
                event.clientY
            );
            cardItem.hidden = false;
            if (!elemBelow) return;
            let droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    // null when we were not over a droppable before this event
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    // null if we're not coming over a droppable now
                    // (maybe just left the droppable)
                    enterDroppable(currentDroppable);
                }
            }
        }
        document.addEventListener('mousemove', onMouseMove);
        cardItem.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            cardItem.onmouseup = null;
        };
        function enterDroppable(elem) {
            elem.style.background = 'pink';
        }
        function leaveDroppable(elem) {
            elem.style.background = '';
        }
        cardItem.ondragstart = function () {
            return false;
        };
    });
    // delete card by button
    deleteButton.addEventListener('click', (event) => {
        console.log(
            event.currentTarget.parentNode.parentNode.parentNode.parentNode
        );
        event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
    });
    count += 1;
};

// open modal (нажатие на кнопку + добавить)
openCardButton.addEventListener('click', openCardMenu);
// close by button
closeModalButton.addEventListener('click', closeCardMenuByButton);
// closs by ESC
window.addEventListener('keydown', closeCardMenuByKey);
// create card
createCardButton.addEventListener('click', createCard);
//
// TODO: fix cards
// TODO: localstorage
