//              кнопка *добавить*
const openCardButton = document.querySelector('.add-button');
//              модальное окно(окно добавления)
const createMenu = document.querySelector('.modal');
//              кнопка закрытия модального окна
const closeCreateModalButton = document.querySelector('.close');
//
const changeModal = document.querySelector('.change-modal');
//
const closeEditModalButton = document.querySelector('.change-close');
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
let closeCreateCardMenuByButton = () => {
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
//
let closeChangeModalMenuByButton = () => {
    changeModal.classList.remove('change-modal-flex');
};
let closeChangeModalMenuByKey = (event) => {
    if (event.key == 'Escape') {
        changeModal.classList.remove('change-modal-flex');
    }
};

// check box check
checkboxDrag.checked = false;
console.log(checkboxDrag.checked);
checkboxDrag.addEventListener('change', () => {
    if (checkboxDrag.checked == true) {
        $(function () {
            $('.cards').sortable({
                handle: `.card__header`,
                cursor: 'move',
            });
            $('#sortable').disableSelection();
        });
    }
});

let count = localStorage.getItem('count') || 0;

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
    // insert card in html(cards)
    cards.insertAdjacentHTML('beforeend', template);

    // check the statement
    if (!isInit) {
        const cardsStorage = localStorage.getItem(`cards-${id}`)
            ? JSON.parse(localStorage.getItem(`cards-${id}`))
            : [];
        console.log(cardsStorage);
        cardsStorage.push({
            id: id,
            formatedDate: formatedDate,
            selectOptionType: selectOptionType,
            inputCardNumber: inputCardNumber,
        });
        localStorage.setItem(`cards-${id}`, JSON.stringify(cardsStorage));
    }

    // open menu to drag/delete
    document.querySelector(`.btn-${id}`).addEventListener('click', (event) => {
        document
            .querySelector(`.edit-modal-${id}`)
            .classList.toggle('edit-modal-flex');
    });

    // delete card by button from(menu)
    document
        .querySelector(`.delete-btn-${id}`)
        .addEventListener('click', (event) => {
            console.log(document.querySelector(`.card-${id}`));
            document.querySelector(`.card-${id}`).remove();
            localStorage.removeItem(`cards-${id}`);

            // let arr = JSON.parse(localStorage.getItem(`cards-${id}`)) ?? {};
            // delete arr[id];
            // localStorage.setItem(`cards-${id}`, JSON.stringify(arr));
        });
    // edit card by button from(menu)
    document.querySelector(`.edit-btn-${id}`).addEventListener('click', () => {
        document
            .querySelector(`.edit-modal-${id}`)
            .classList.remove('edit-modal-flex');
        document.querySelector('#change-card-number').value = inputCardNumber;
        changeModal.classList.add('change-modal-flex');
    });
    // drag card by button
    document
        .querySelector(`.drag-btn-${id}`)
        .addEventListener('mousedown', (event) => {
            event.preventDefault();
            // TODO: fix this(drag function)
        });
    return;
};

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

// edit card fucntion
// document.querySelector('.change-card').addEventListener('click', () => {
//     console.log('lol');
//     const inputCardNumber = document.querySelector('#card-number').value;
//     const selectOptionType = document.querySelector('#create-select').value;
//     const currentDate = new Date();
//     const formatedDate =
//         currentDate.getDate() +
//         '-' +
//         (currentDate.getMonth() + 1) +
//         '-' +
//         currentDate.getFullYear();
//     createCard(selectOptionType, inputCardNumber, formatedDate, count);
//     count++;
//     localStorage.setItem('count', count);
//     createMenu.style.display = 'none';
//     document.querySelector('#card-number').value = '';
// });

// open modal (нажатие на кнопку + добавить)
openCardButton.addEventListener('click', openCardMenu);
// close modal
closeCreateModalButton.addEventListener('click', closeCreateCardMenuByButton);
window.addEventListener('keydown', closeCardMenuByKey);

// close change modal
closeEditModalButton.addEventListener('click', closeChangeModalMenuByButton);
window.addEventListener('keydown', closeChangeModalMenuByKey);

function initCards() {
    let cards = [];
    for (let i = 0; i <= 10; i++) {
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
//
// TODO: fix cards
// TODO: localstorage
