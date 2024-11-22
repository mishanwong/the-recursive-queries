from flask import Flask # type: ignore

app = Flask(__name__)

app.config["MYSQL_HOST"] = "classmysql.engr.oregonstate.edu"
app.config["MYSQ_USER"] = "cs340_wongmis"
app.config["MYSQL_PASSWORD"] = "3501"
app.config["MYSQL_DB"] = "cs340_wongmis"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

@app.route("/")
def index():
    return "Hello The Recursive Queries"

if __name__ == "__main__":
    app.run(port=2172, debug=True)