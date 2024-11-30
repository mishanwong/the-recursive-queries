import os
from dotenv import load_dotenv
import pymysql
from pymysql.connections import ConnectionPool


load_dotenv()
host = os.environ.get("host")
user = os.environ.get("user")
passwd = os.environ.get("passwd") 
db = os.environ.get("db")
port = int(os.environ.get("port"))

db_connection = pymysql.connect(host=host, user=user, passwd=passwd, db=db, port=port)
pool = ConnectionPool(host=host, user=user, passwd=passwd, db=db, port=port, max_connections=10)

def get_connection_from_pool():
    return pool.connection()

def connect_to_database(host = host, user = user, passwd = passwd, db = db, port = port):
    global db_connection
    try:
        db_connection.ping(reconnect=True)
    except (pymysql.OperationalError, pymysql.MySQLError):
        print("Reconnecting to the database...")
        if db_connection:
            db_connection.close()
        db_connection = pymysql.connect(host = host, user = user, passwd = passwd, db = db, port = port)
    return db_connection

def execute_query(db_connection = None, query = None, query_params = ()):
    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None

    print("Executing %s with %s" % (query, query_params))
    # cursor = db_connection.cursor(pymysql.cursors.DictCursor)
    
    # cursor.execute(query, query_params)
    # db_connection.commit()
    # return cursor
    with db_connection.cursor(pymysql.cursors.DictCursor) as cursor:
        cursor.execute(query, query_params)
        db_connection.commit()
        return cursor

if __name__ == "__main__":
    db = connect_to_database()