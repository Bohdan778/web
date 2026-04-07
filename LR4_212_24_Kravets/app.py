from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS discounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            amount REAL,
            type TEXT,
            discount REAL,
            final_price REAL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()

    print("DATA:", data) 

    if not data:
        return jsonify({"error": "No data received"})

    try:
        name = data.get('name')
        email = data.get('email')
        amount = float(data.get('amount'))
        type_ = data.get('type')

        discount_map = {
            "new": 0.05,
            "regular": 0.10,
            "vip": 0.20
        }

        discount = discount_map.get(type_, 0)
        discount_value = amount * discount
        final_price = amount - discount_value

        conn = get_db()
        conn.execute('''
            INSERT INTO discounts (name, email, amount, type, discount, final_price)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, email, amount, type_, discount_value, final_price))
        conn.commit()
        conn.close()

        return jsonify({
            "discount": discount_value,
            "final_price": final_price
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)})

@app.route('/check')
def check():
    conn = get_db()
    rows = conn.execute('SELECT * FROM discounts').fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    app.run(debug=True)