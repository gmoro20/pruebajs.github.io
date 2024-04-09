import telebot
from telebot import types


token = "6566593316:AAEcOJhOnL-BjW7JX8m9Qp79Es3a9JLn59o"
bot = telebot.TeleBot(token)

@bot.message_handler(content_types=['document'])
def handle_document(message):
    chatId = str(message.chat.id)
    bot.send_message(chatId, message.text)


if __name__ == "__main__":
    bot.polling()