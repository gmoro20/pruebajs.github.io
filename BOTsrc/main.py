import telebot
from telebot import types


token = "...."
bot = telebot.TeleBot(token)

@bot.message_handler(content_types=['web_app_data'])
def handle_document(message):
    chatId = str(message.chat.id)
    bot.send_message(chatId, message.web_app_data.data)

@bot.message_handler(commands=['start'])
def update_league(message):
    web_app_button = types.KeyboardButton(text="Abrir Web App", web_app=types.WebAppInfo(url="https://gmoro20.github.io/pruebajs.github.io/"))

    keyboard = types.ReplyKeyboardMarkup()
    keyboard.add(web_app_button)

    bot.send_message(message.chat.id, "¡Bienvenido! Haz clic en el botón para abrir la aplicación web:", reply_markup=keyboard)


if __name__ == "__main__":
    bot.polling()
