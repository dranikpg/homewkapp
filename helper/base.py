import requests
import json

baseurl = "http://127.0.0.1:8090/"
_s = requests.session();

def get(sub="", pms=None):
    return _s.get(baseurl + sub, pms)


def post(sub="",pa=None, da=None):
    return _s.post(baseurl+sub, data=da)


def pjson(js):
    try:
        parsed = json.loads(js)
    except:
        return "NONE"
    return json.dumps(parsed,indent=4, sort_keys=True)

