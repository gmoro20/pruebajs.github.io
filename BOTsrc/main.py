import telebot
from telebot import types


token = "...."
bot = telebot.TeleBot(token)

@bot.message_handler(content_types=['document'])
def handle_document(message):
    chatId = str(message.chat.id)
    bot.send_message(chatId, message.text)


if __name__ == "__main__":
    bot.polling()
