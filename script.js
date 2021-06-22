const openModalCardButton = document.querySelector('.add-button'); //? кнопка *добавить*
const createCardMenu = document.querySelector('.modal'); //? модальное окно(окно добавления)
const closeCreateCardMenuButton = document.querySelector('.close'); //? кнопка закрытия модального окна
const editModal = document.querySelector('.edit-modal'); //? модальное окно для редактирования карточек
const closeEditModalButton = document.querySelector('.change-close'); //? кнопка для закрытия модального окна редактирования
const cardMenuButtons = document.querySelectorAll('.menu-btn'); //? блок с кнопками карты
let cards = document.querySelector('.cards'); //? блок с карточками
let inputCardNumber = document.getElementById('card-number'); //? строка ввода данных в модальном окне добавления
let createCardButton = document.querySelector('.create-card'); //? кнопка 'добавить' в модальном окне добавления
let checkboxDragInput = document.getElementById('checkbox-drag'); //? чекбокс 'enable drag and drop'
//
let checboxToSort = document.querySelector('#sort-select');
//! открытие модального окна с созданием карточки
let openCardMenu = () => {
    createCardMenu.style.display = 'flex';
    inputCardNumber.focus();
    createCardButton.setAttribute('disabled', 'dissabled');
    inputCardNumber.addEventListener('keydown', () => {
        if (inputCardNumber.value == ' ' || null) {
            createCardButton.setAttribute('disabled', 'dissabled');
        } else {
            createCardButton.removeAttribute('disabled');
        }
    });
};

//! закрытие модального окна добавления нажатием на "крестик x"
let closeCreateCardMenuByButton = () => {
    createCardMenu.style.display = 'none';
    inputCardNumber.value = '';
    inputCardNumber.removeAttribute('autofocus');
};

//! закрытие модального окна добавления нажатием на кнопку `Escape` "
let closeCardMenuByKey = (event) => {
    if (event.key == 'Escape') {
        createCardMenu.style.display = 'none';
        inputCardNumber.removeAttribute('autofocus');
    }
};
//!
let closeChangeModalMenuByButton = () => {
    editModal.classList.remove('edit-modal-flex');
};

//! Закрытие окна редактирование клавишей "ESC"
let closeChangeModalMenuByKey = (event) => {
    if (event.key == 'Escape') {
        editModal.classList.remove('edit-modal-flex');
    }
};
checboxToSort.value = checboxToSort[0].value;

//! sort listener
checboxToSort.addEventListener('change', () => {
    //! sort by ID: ascending
    if (checboxToSort.value == 'Sort by ID: ascending / descending') {
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.reverse();
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    if (checboxToSort.value == 'Sort by Date of creation: ascending') {
        console.log('Date: ascending ');
    }
    if (checboxToSort.value == 'Sort by Date of creation: descending') {
        console.log('Date: descending');
    }
    if (checboxToSort.value == 'Sort by Order Type: ascending') {
        console.log('Order type: ascending');
    }
    if (checboxToSort.value == 'Sort by Order type: descending') {
        console.log('Order type: descending');
    }
});

checkboxDragInput.checked = false; //? set default value "false" to checkbox
//! Функция проверяющая checkbox и разрешающая перетаскивать карточки
checkboxDragInput.addEventListener('change', () => {
    if (checkboxDragInput.checked == true) {
        $(function () {
            $('.cards').sortable({
                handle: `.card__header`,
                cursor: 'move',
                forcePlaceholderSize: true,
            });
        });
    } else {
        $('.cards').sortable('disable');
    }
});

//! Счетчик
let count = localStorage.getItem('count') || 0;

//! Функция создания карточки
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
                    <div class="card-buttons-menu card-buttons-menu-${id}">
                    <button class="edit-btn edit-btn-${id}"><img src="./icons/edit.png" style="margin-right: 10px;"><span>редактировать</span></button>
                    <button class="delete-btn delete-btn-${id}"><img src="./icons/close.png" style="margin-right: 10px;"><span>удалить</span></button>
                    </div>
                    <button class="drag-btn drag-btn-${id}"><img src="./icons/move.png"></button>
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
    //!  insert card in html(cards)
    cards.insertAdjacentHTML('beforeend', template);

    //!  check the statement(localStorage)
    if (!isInit) {
        const cardsStorage = localStorage.getItem(`cards-${id}`)
            ? JSON.parse(localStorage.getItem(`cards-${id}`))
            : [];
        cardsStorage.push({
            id: id,
            formatedDate: formatedDate,
            selectOptionType: selectOptionType,
            inputCardNumber: inputCardNumber,
        });
        localStorage.setItem(`cards-${id}`, JSON.stringify(cardsStorage));
    }

    //!  open menu to edit/delete
    document.querySelector(`.btn-${id}`).addEventListener('click', (event) => {
        document
            .querySelector(`.card-buttons-menu-${id}`)
            .classList.toggle('card-buttons-menu-flex');
    });

    //!  delete card by button from(menu)
    document
        .querySelector(`.delete-btn-${id}`)
        .addEventListener('click', (event) => {
            document.querySelector(`.card-${id}`).remove();
            localStorage.removeItem(`cards-${id}`);
        });

    //!  edit card by button from(menu)
    document.querySelector(`.edit-btn-${id}`).addEventListener('click', () => {
        document
            .querySelector(`.card-buttons-menu-${id}`)
            .classList.remove('card-buttons-menu-flex');
        document.querySelector('#edit-card-number').value = inputCardNumber;
        document.querySelector('#edit-select').value = selectOptionType;
        editModal.classList.add('edit-modal-flex');
        let arr = [];
        console.log(localStorage.getItem(`cards-${inputCardNumber - 1}`));
        arr.push(
            JSON.parse(localStorage.getItem(`cards-${inputCardNumber - 1}`))
        );
        console.log(arr[0]);
        localStorage.removeItem(`cards-${inputCardNumber - 1}`);
    });

    //!  drag card by button
    //TODO: drag and drop

    return;
};

//!  create card by click on (createCardButton)
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
    createCardMenu.style.display = 'none';
    document.querySelector('#card-number').value = '';
});

//!  create card by button(Enter)
createCardMenu.addEventListener('keydown', (event) => {
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
        createCard(selectOptionType, inputCardNumber, formatedDate, +count);
        count++;
        localStorage.setItem('count', count);
        createCardMenu.style.display = 'none';
        document.querySelector('#card-number').value = '';
    }
});

//! Событие открывания модального окна нажатием на кнопку (+Добавить)
openModalCardButton.addEventListener('click', openCardMenu);
//! Событие закрывания модального окна нажатием на кнопку(X)
closeCreateCardMenuButton.addEventListener(
    'click',
    closeCreateCardMenuByButton
);
//! Событие закрывания модального окна нажатием на клавишу(ESC)
window.addEventListener('keydown', closeCardMenuByKey);

//! Событие открвания окна редактирования карточки
closeEditModalButton.addEventListener('click', closeChangeModalMenuByButton);
window.addEventListener('keydown', closeChangeModalMenuByKey);

//! init cards from localStorage to html -> cards
function initCards() {
    let cards = [];

    for (let i = 0; i < count; i++) {
        cards.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
    }
    for (let card of cards) {
        if (card == null) {
            continue;
        }
        createCard(
            card[0].selectOptionType,
            card[0].inputCardNumber,
            card[0].formatedDate,
            card[0].id,
            true
        );
    }
}
initCards();

//! count of localStorage memory
var _lsTotal = 0,
    _xLen,
    _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = (localStorage[_x].length + _x.length) * 2;
    _lsTotal += _xLen;
}
console.log('Total = ' + (_lsTotal / 1024).toFixed(2) + ' KB');

//TODO: localstorage
