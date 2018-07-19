import requests
import json

baseurl = "http://127.0.0.1/api/"
_s = requests.session();

TAG_HW=0
TAG_INFO=1

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

def msg(content):
    return post("msg", da={
        "t":"C",
        "content":content
    })

def rm_msg(id):
    return post("msg", da={
        "t":"R",
        "id":id
    })

def drop_msg():
    return post("msg", da={
        "t":"D"
    })

def task(date, subj, content, tag):
    return post("edit", da={
        "type":"C",
        "content":content,
        "date":date,
        "subj":subj,
        "tag":tag
    })

def edit_task(id, content):
    return post("edit", da={
        "t":"E",
        "id":id,
        "content":content
    })

def rm_task(id):
    return post("edit", da={
        "t":"D",
        "id":id
    })

def pjson(js):
    try:
        parsed = json.loads(js)
    except:
        return "NONE"
    return json.dumps(parsed,indent=4, sort_keys=True)
