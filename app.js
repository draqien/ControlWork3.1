const regExp = /^\d+$/;

const containsOnlyDigits = (str) => {
    return regExp.test(str);
};

console.log(containsOnlyDigits("12345"));



const interval1 = setInterval(() => {
    console.log("Прошла секунда");
}, 1000);



const count = () => {
    let i = 1;
    const interval = setInterval(() => {
        console.log(i);
        i++;
        if (i > 10) {
            clearInterval(interval);
        }
    }, 1000);
};
count();



const display = document.querySelector("#display");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

let time = 10;
let interval = null;

const start = () => {
    if (interval !== null || time === 0) return;
    interval = setInterval(() => {
        time--;
        display.textContent = time;

        if (time === 0) {
            clearInterval(interval);
            interval = null;
        }
    }, 1000);
};
const stop = () => {
    clearInterval(interval);
    interval = null;
};
const reset = () => {
    stop();
    time = 10;
    display.textContent = time;
};
startButton.onclick = start;
stopButton.onclick = stop;
resetButton.onclick = reset;



const block = document.querySelector(".block");

block.onclick = () => {
    block.classList.toggle("active");
};



const xhr = new XMLHttpRequest();

xhr.open('GET', './test.json');
xhr.onload = function () {
    if (xhr.status === 200) {
        try {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
        } catch (error) {
            console.log('Ошибка обработки JSON:', error);
        }
    } else {
        console.log('Ошибка:', xhr.status);
    }
};
xhr.onerror = function () {
    console.log('Ошибка запроса');
};
xhr.send();



const loginInput = document.querySelector('#loginInput');
const checkBtn = document.querySelector('#checkBtn');
const userCard = document.querySelector('#userCard');
const message = document.querySelector('#message');

checkBtn.addEventListener('click', function () {
    fetch('users.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки');
        }

        return response.json();
    })
    .then(users => {
        const user = users.find(item => item.login === loginInput.value.trim());

        if (user) {
            userCard.innerHTML = `
                <h2>${user.login}</h2>
                <p>Роль: ${user.role}</p>
                <p>Email: ${user.email}</p>
            `;

            message.textContent = 'Пользователь найден';
        } else {
            userCard.innerHTML = '';
            message.textContent = 'Пользователь не найден';
        }
    })
    .catch(error => {
        message.textContent = 'Ошибка запроса';
        console.log(error);
    });
});



function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'Alex', age: 20 });
        }, 1000);
    });
}
function getIdeas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Идея 1', 'Идея 2', 'Идея 3']);
        }, 2000);
    });
}
function getWords() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Слово 1', 'Слово 2']);
        }, 3000);
    });
}
Promise.all([
    getUser(),
    getIdeas(),
    getWords()
])
    .then(result => {
        console.log('Все данные загружены:');
        console.log(result);
    })
    .catch(error => {
        console.log('Ошибка:', error);
});



async function getUserData(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log('Ошибка:', error);
    } finally {
        console.log('Запрос завершён');
    }
}
getUserData(1);



fetch('https://jsonplaceholder.typicode.com/photos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        albumId: 1,
        title: 'My photo',
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }

        return response.json();
    })
    .then(data => {
        console.log('Успешно:', data);
    })
    .catch(error => {
        console.log('Ошибка:', error.message);
});