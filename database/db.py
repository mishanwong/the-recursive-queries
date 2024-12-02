import os
from dotenv import load_dotenv
import pymysql


load_dotenv()
host = os.environ.get("host")
user = os.environ.get("user")
passwd = os.environ.get("passwd") 
db = os.environ.get("db")
port = int(os.environ.get("port"))



def connect_to_database(host = host, user = user, passwd = passwd, db = db, port = port):
    try:
        db_connection = pymysql.connect(host=host, 
                                        user=user, 
                                        passwd=passwd, 
                                        db=db, 
                                        port=port)
        return db_connection
    except pymysql.OperationalError as e:
        print(f"Operational Error: {e}") 
        return None
    except pymysql.MySQLError as e:
        print(f"MySQLError: {e}")
        return None

def execute_query(db_connection = None, query = None, query_params = ()):
    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None
    try:
        db_connection.ping(reconnect=True)

        print("Executing %s with %s" % (query, query_params))
        with db_connection.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute(query, query_params)
            db_connection.commit()
            return cursor
    except pymysql.MySQLError as e:
        print(f"Query execution failed: {e}")
        return None
