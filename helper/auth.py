from base import *

r = post("login", da={
             "username":"vlad",
             "password":"pw",
             "submit":"Login"
         })
print(pjson(r.text))
