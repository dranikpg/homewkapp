from base import *

login("vlad", "pw")

r = post("msg", da={
    "t":"C",
    "desc":"Example of a message, like don't forget that tomorrow is opposite day"
})
print(r.text)

r = get("msg")
print(pjson(r.text))