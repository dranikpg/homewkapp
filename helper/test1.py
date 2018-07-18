from base import *

r = login("vlad", "pw")


print(r.text)

r = get("pend")
print(pjson(r.text))