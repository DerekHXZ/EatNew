# imports
from init import makeClient
from flask import Flask, redirect, session, request, url_for, render_template, flash
from foursquare import Foursquare

app = Flask(__name__)

@app.route("/")
def login_page():
    if 'access_token' not in session:
        return render_template("login.html", auth_url = makeClient().oauth.auth_url())
    else:
        return redirect("/home")

@app.route("/login")
def redirect_page():
    client = makeClient()
    code = request.args.getlist("code")
    access_token = client.oauth.get_token(str(code[0]))
    session['access_token'] = access_token
    return redirect("/home")

@app.route("/logout")
def logout():
    del session['access_token']
    return redirect("/")

@app.route("/home")
def home_page():
    if 'access_token' not in session:
        return redirect("/")
    return render_template("index.html")

@app.route("/list")
def fetch_list():
   if 'access_token' not in session:
        return redirect("/")
   client = foursquare.Foursquare(session['access_token'])
   ll = request.form['lat']+','+request.form['lon']
   venues = client.venues.search(
           params={
               'll': ll;
               'intent': 'browse';
               'radius': '1000';
               'categoryId': '4d4b7105d754a06374d81259' # Restaurant
               })
   history = client.users.checkins().items
   for place in history:
       if id in place:
           for i = 0 : len(venues)
               if venues[i].id == place.id:
                   del venues[i]
   return render_template('list.html', venues[1:5])

app.debug = True
app.secret_key = "/x85/xfe/x98j/xc8FQb-/x88/xaf/x87/xda/xed/xba/n/x1dk/xbb//0b/xb06/xd2/x87"
if __name__ == "__main__":
    app.run()
