require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const BODY = ['нос', 'ноздря', 'уши', 'рука', 'голова', 'нога', 'мизинец'];
const ADJECTIVE = ['вонючий', 'вонючая', 'унылая', 'дурацкая', 'галимая', 'чудная', 'неприятная'];
const WORDS = ['муха', 'выдра', 'дубина', 'мартышка', 'крыса', 'макака', 'бебра'];





bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const first_name = msg.chat.first_name;

    if (msg.text) {

        const text = msg.text.toLowerCase();

        if (text === 'получить дразнилку') {
            function randomWord(arr) {
                return arr[Math.floor(Math.random() * arr.length)]
            };
            bot.sendMessage(chatId, `У тебя ${randomWord(BODY)} как ${randomWord(ADJECTIVE)} ${randomWord(WORDS)}!!!`);
        } else if (text !== '/start'){
            bot.sendMessage(chatId, '' + first_name + ', понравилось? Жми ещё!!!');
        }
    };
});

bot.onText(/\/start/, (msg, match) => {

    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}! Это мой первый бот - дразнилка-бот. Здесь ты можешь узнать некоторые вещи о себе, 
    я не думаю что это правда, но вот бот так считает!`);
    openKlava(chatId);
});

function openKlava(chatId) {
    bot.sendMessage(chatId, 'Клавиатура открыта', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Получить дразнилку'
                    } 
                ]
            ],
            resize_keyboard: true
        }
    })
};