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

let cards = document.querySelector('.cards');

//              строка ввода данных в модальном окне добавления

let inputCardNumber = document.getElementById('card-number');

//              кнопка 'добавить' в модальном окне добавления

let createCardButton = document.querySelector('.create-card');

//              открытие модального окна добавления "товара"

let checkboxDrag = document.getElementById('checkbox-drag');
console.log(checkboxDrag);

let openCardMenu = () => {
    createMenu.style.display = 'flex';
    // set focus to input card number
    inputCardNumber.focus();
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
    inputCardNumber.removeAttribute('autofocus');
};

//              закрытие модального окна добавления нажатием на кнопку `Escape` "

let closeCardMenuByKey = (event) => {
    if (event.key == 'Escape') {
        createMenu.style.display = 'none';
        inputCardNumber.removeAttribute('autofocus');
    }
};

checkboxDrag.addEventListener('change', () => {
    console.log(checkboxDrag.checked);
});

let count = localStorage.getItem('count') || 1;

let createCard = (
    selectOptionType,
    inputCardNumber,
    formatedDate,
    id,
    isInit
) => {
    const template = `
        <div class="cards__item card-${id}">
            <div class="card__header">
                <div class="card__name">${inputCardNumber}</div>
                <div class="card__buttons">
                    <div class="edit-modal edit-modal-${id}">
                    <button class="edit-btn"><img src="./icons/edit.png" style="margin-right: 10px;"><span>редактировать</span></button>
                    <button class="delete-btn delete-btn-${id}"><img src="./icons/close.png" style="margin-right: 10px;"><span>удалить</span></button>
                    </div>
                    <button class="drag-btn"><img src="./icons/move.png"></button>
                    <button class="menu-btn btn-${id}"><img src="./icons/menu.png"></button>
                </div>
            </div>
            <div class="card__body">
                <div class="card__id">ID: ${id}</div>
                <div class="card__date">${formatedDate}</div>
                <div class="card__type">Тип: ${selectOptionType}</div>
            </div>
        </div>
    `;
    // insert card in html(cards)
    cards.insertAdjacentHTML('beforeend', template);

    // check the statement
    if (!isInit) {
        const cardsStorage = localStorage.getItem('cards')
            ? JSON.parse(localStorage.getItem('cards'))
            : [];
        cardsStorage.push({
            id: id,
            formatedDate: formatedDate,
            selectOptionType: selectOptionType,
            inputCardNumber: inputCardNumber,
        });
        localStorage.setItem('cards', JSON.stringify(cardsStorage));
    }

    // open menu to drag/delete
    document.querySelector(`.btn-${id}`).addEventListener('click', (event) => {
        document
            .querySelector(`.edit-modal-${id}`)
            .classList.toggle('edit-modal-flex');
    });

    // delete button from(menu)
    document
        .querySelector(`.delete-btn-${id}`)
        .addEventListener('click', (event) => {
            console.log(document.querySelector(`.card-${id}`));
            document.querySelector(`.card-${id}`).remove();
        });

    // drag card by button
    return;
};

// open modal (нажатие на кнопку + добавить)
openCardButton.addEventListener('click', openCardMenu);
// close by button
closeModalButton.addEventListener('click', closeCardMenuByButton);
// closs by ESC
window.addEventListener('keydown', closeCardMenuByKey);

// create card by click on (createCardButton)
createCardButton.addEventListener('click', () => {
    const inputCardNumber = document.querySelector('#card-number').value;
    const selectOptionType = document.querySelector('#create-select').value;
    const currentDate = new Date();
    const formatedDate =
        currentDate.getDate() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getFullYear();
    createCard(selectOptionType, inputCardNumber, formatedDate, count);
    count++;
    localStorage.setItem('count', count);
    createMenu.style.display = 'none';
    document.querySelector('#card-number').value = '';
});

// create card by button(Enter)
createMenu.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        const inputCardNumber = document.querySelector('#card-number').value;
        const selectOptionType = document.querySelector('#create-select').value;
        const currentDate = new Date();
        const formatedDate =
            currentDate.getDate() +
            '-' +
            (currentDate.getMonth() + 1) +
            '-' +
            currentDate.getFullYear();
        createCard(selectOptionType, inputCardNumber, formatedDate, count);
        count++;
        localStorage.setItem('count', count);
        createMenu.style.display = 'none';
        document.querySelector('#card-number').value = '';
    }
});

function initCards() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    for (let card of cards) {
        createCard(
            card.selectOptionType,
            card.inputCardNumber,
            card.formatedDate,
            card.id,
            true
        );
    }
}
initCards();
//
// TODO: fix cards
// TODO: localstorage
