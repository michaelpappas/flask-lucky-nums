from flask import Flask, render_template, request, jsonify
import random, requests

app = Flask(__name__)


@app.get("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.post("/api/get-lucky-num")
def return_lucky_num():
    """ Return JSON of all number and year data {"num": {"fact": "...",
                                                 "num": <integer>
                                                 },
                                                "year": {"fact": "...",
                                                    "year": <integer>}
                                                    }
    """
    year = request.json['year']
    errors = error_check(request.json)
    number_data = num_request()
    year = request.json['year']
    year_data = year_request(year)

    if errors:
        return jsonify(errors), 200
    return jsonify(number_data, year_data)

def error_check(data):
    resp = {}
    resp['errors'] = {}


    if data['name'] == '':
        resp['errors']['name']=["This field is required."]
    if data['email'] == '':
        resp['errors']['email']=["This field is required."]
    if data['year'] == '':
        resp['errors']['year']=["This field is required."]

    if data['color'] not in ['red', 'green', 'orange', 'blue']:
        resp['errors']['color']=["Invalid value, must be one of: red, green, orange, blue."]

    if resp['errors'] == {}:
        return None

    else:
        return resp

def num_request():
    """ generates and random number and returns JSON of number and fact about number"""

    rand_num = random.randrange(0,100)
    num_fact = requests.get(f"http://numbersapi.com/{rand_num}/math")

    return {"num":{"fact": num_fact.text,
                "num": rand_num}
                }

def year_request(year):
    """ generates and random number and returns JSON of number and fact about number"""

    year_fact = requests.get(f"http://numbersapi.com/{year}/year")

    return {"year":{"fact": year_fact.text,
                    "year": year}
                    }

