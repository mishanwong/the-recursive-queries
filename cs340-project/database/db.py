import MySQLdb
import os
from dotenv import load_dotenv

load_dotenv()
host = os.environ.get("host")
user = os.environ.get("user")
passwd = os.environ.get("passwd") 
db = os.environ.get("db")
db_connection = MySQLdb.connect(host,user,passwd,db)

def connect_to_database(host = host, user = user, passwd = passwd, db = db):
    global db_connection
    try:
        db_connection.ping()
    except MySQLdb.Error:
        db_connection = MySQLdb.connect(host, user, passwd, db)
    return db_connection

def execute_query(db_connection = None, query = None, query_params = ()):
    if db_connection is None:
        print("No connection to the database found! Have you called connect_to_database() first?")
        return None

    if query is None or len(query.strip()) == 0:
        print("query is empty! Please pass a SQL query in query")
        return None

    print("Executing %s with %s" % (query, query_params))
    cursor = db_connection.cursor(MySQLdb.cursors.DictCursor)

    
    # params = tuple()
    # for q in query_params:
    #     params = params + (q)

    cursor.execute(query, query_params)
    db_connection.commit()
    return cursor

if __name__ == "__main__":
    db = connect_to_database()