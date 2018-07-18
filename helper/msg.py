from base import *

login("vlad", "pw")

r = post("msg", da={
    "t":"C",
    "desc":"Kek an message"
})
print(r.text)

r = get("msg")
print(pjson(r.text))