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
let checboxToSort = document.querySelector('#sort-select'); //? чекбокс 'Sorting'
//! Счетчик
let count = localStorage.getItem('count') || 0;

//* Функция создания карточки
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
        let cardsStorage = localStorage.getItem(`cards-${id}`)
            ? JSON.parse(localStorage.getItem(`cards-${id}`))
            : [];
        cardsStorage = {
            id: id,
            formatedDate: formatedDate,
            selectOptionType: selectOptionType,
            inputCardNumber: inputCardNumber,
        };
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
            window.location.reload();
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
        console.log(localStorage.getItem(`cards-${id}`));
        arr.push(JSON.parse(localStorage.getItem(`cards-${id}`)));
        document.querySelector('.edit-card').addEventListener('click', () => {
            arr[0].inputCardNumber =
                document.querySelector('#edit-card-number').value;
            arr[0].selectOptionType =
                document.querySelector('#edit-select').value;
            localStorage.setItem(`cards-${id}`, JSON.stringify(arr[0]));
            window.location.reload();
        });
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

//! закрытие модального окна 'Создания карточки' нажатием на "крестик x"
let closeCreateCardMenuByButton = () => {
    createCardMenu.style.display = 'none';
    inputCardNumber.value = '';
    inputCardNumber.removeAttribute('autofocus');
};

//! закрытие модального окна 'Создания карточки' нажатием на кнопку `Escape` "
let closeCardMenuByKey = (event) => {
    if (event.key == 'Escape') {
        createCardMenu.style.display = 'none';
        inputCardNumber.focus();
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
    if (checboxToSort.value == 'Sort by ID: ascending') {
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
        });
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    //! sort by ID: descending
    if (checboxToSort.value == 'Sort by ID: descending') {
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }

        storageArr.sort((a, b) => {
            if (a.id < b.id) {
                return 1;
            }
        });
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    //! sort by DATE: ascending
    if (checboxToSort.value == 'Sort by Date of creation: ascending') {
        console.log('Date: ascending ');
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.sort((a, b) => {
            if (a.formatedDate > b.formatedDate) {
                return 1;
            }
        });
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    //! sort by DATE: descending
    if (checboxToSort.value == 'Sort by Date of creation: descending') {
        console.log('Date: descending');
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.sort((a, b) => {
            if (a.formatedDate < b.formatedDate) {
                return 1;
            }
        });
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    //! sort by ORDER TYPE: ascending
    if (checboxToSort.value == 'Sort by Order Type: ascending') {
        console.log('Order type: ascending');
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.sort((a, b) => {
            if (a.selectOptionType > b.selectOptionType) {
                return 1;
            }
        });
        console.log(storageArr);
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
    }
    //! sort by ORDER TYPE: descending
    if (checboxToSort.value == 'Sort by Order type: descending') {
        console.log('Order type: descending');
        const storageArr = [];
        for (let i = 0; i < count; i++) {
            storageArr.push(JSON.parse(localStorage.getItem(`cards-${i}`)));
        }
        storageArr.sort((a, b) => {
            if (a.selectOptionType < b.selectOptionType) {
                return 1;
            }
        });
        console.log(storageArr);
        for (let w = 0; w < count; w++) {
            localStorage.removeItem(`cards-${w}`);
            localStorage.setItem(`cards-${w}`, JSON.stringify(storageArr[w]));
        }
        window.location.reload();
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

openModalCardButton.addEventListener('click', openCardMenu);
closeCreateCardMenuButton.addEventListener(
    'click',
    closeCreateCardMenuByButton
);
window.addEventListener('keydown', closeCardMenuByKey);
closeEditModalButton.addEventListener('click', closeChangeModalMenuByButton);
window.addEventListener('keydown', closeChangeModalMenuByKey);

//TODO: fix filter function
let searchCard = () => {
    let filterInvoiceNumber = document
        .querySelector('#filter-invoice-number')
        .value.toUpperCase();
    let cards = document.getElementsByClassName('cards');
    for (let i = 0; i < cards.length; i++) {
        let cardsId = cards[i].querySelectorAll(
            '.cards__item .card__header .card__name'
        );
        cardsId.forEach((a) => {
            console.log(a);
            if (a.innerText.toUpperCase().indexOf(filterInvoiceNumber) > -1) {
                cards[i].style.display = ' ';
            } else {
                cards[i].style.display = 'none';
            }
        });
    }
};

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
            card.selectOptionType,
            card.inputCardNumber,
            card.formatedDate,
            card.id,
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
