import requests
import json

baseurl = "http://127.0.0.1/api/"
_s = requests.session();

def get(sub="", pms=None):
    return _s.get(baseurl + sub,params=pms)


def post(sub="",pa=None, da=None):
    return _s.post(baseurl+sub, data=da)

def login(name, pw):
    return post("login", da={
             "username":name,
             "password":pw,
             "submit":"Login"
         })

def pjson(js):
    try:
        parsed = json.loads(js)
    except:
        return "NONE"
    return json.dumps(parsed,indent=4, sort_keys=True)

