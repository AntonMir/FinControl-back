const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routers = require('./routes/auth.routes.js');

const app = express();

const PORT = process.env.PORT || config.get('port') || 5000;

app.use(express.json({ extended: true}))

// префикс для роутов
app.use('/api/auth', require('./routes/auth.routes'))


// подключаемся к MongoDB + слушаем порт 5000
async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`>>> Сервер запущен на http://localhost:${PORT} <<<`);
        })

    } catch (error) {
        console.log('--- Server Error:', error.message, '---');
        process.exit(1);
    }
};

start();



