from flask import Flask, render_template, request
import sqlite3
import re
import html
from werkzeug.security import generate_password_hash

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT,
            city TEXT,
            message TEXT
        )
    ''')

    conn.commit()
    conn.close()

init_db()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    # Фільтрація вхідних даних (захист від XSS)
    name = html.escape(request.form.get('name', '').strip())
    email = html.escape(request.form.get('email', '').strip())
    password = request.form.get('password', '').strip()
    city = html.escape(request.form.get('city', ''))
    message = html.escape(request.form.get('message', '').strip())

    if not name or not email or not password or not city:
        return "Помилка: заповніть всі поля"

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return "Некоректний email"

    if len(password) < 6:
        return "Пароль мінімум 6 символів"


    hashed_password = generate_password_hash(password)

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO users (name, email, password, city, message)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, email, hashed_password, city, message))

    conn.commit()
    conn.close()

    return "Дані збережені ✅"


if __name__ == '__main__':
    app.run(debug=True)