import random
import string
import pyperclip
import time

def id_generator(size=6, chars= string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

n = int(input("n: "))
siz = 4

pws=set()

while(len(pws) < n):
    pws.add(id_generator(siz))

time.sleep(1)

while(True):
    time.sleep(2)
    if(len(pws) > 0):
        v = pws.pop()
        pyperclip.copy(v)
        print(v)
    else:
        break