import pymysql

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',  # Mặc định của XAMPP để trống
        database='butterfly_history.db',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )