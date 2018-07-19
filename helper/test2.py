import subprocess
def sendmessage(message):
    subprocess.Popen(['notify-send', message])
    return

for x in range(0,10):
    sendmessage("LEL" +str(x))