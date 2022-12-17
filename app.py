from flask import Flask, render_template

app = Flask(__name__)


@app.get("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")