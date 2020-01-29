#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan 22 04:36:07 2020

@author: gal3li0
"""

# -*- coding: utf-8 -*-
"""
Created on Sat Jul 20 15:21:27 2019
@author: TEEE
"""

# -*- coding: utf-8 -*-
"""
Created on Sat Jul 20 14:29:31 2019
@author: TEEE
"""

from tkinter import *
from tkinter.ttk import *
from tkinter import scrolledtext
import threading
from PIL import Image
import requests
from io import BytesIO
import os
from time import sleep
url_val=""


def power(urllocal):
#    urllocal = 'http://192.168.43.189'
    return requests.get(urllocal + '/light').text

flag = True
a=0

def route(urllocal):

#    urllocal = 'http://192.168.43.189'
#    urllocal = url_val

    #os.mkdir('tempp')
    #os.chdir(str(os.getcwd, '/tempp'))
  
    url = 'https://classmonitor.herokuapp.com/api/images/'
    print(urllocal)
    
    while flag:   
        try:
            
            response = requests.get(urllocal + '/saved-photo')        
            img = Image.open(BytesIO(response.content))
            img.save("image.png")
            print("fetch: ", response.status_code)
        
            files = { 'image': ('13.png', open('image.png', 'rb'), 'image/png')}
            data = dict(power = power(urllocal), noise='null')
            response = requests.post(url, files=files, data=data)
            print("dump: ", response.status_code)
            sleep(60)
        except :
            print('Error routing')

window = Tk()
window.title("routing app")
window.geometry('300x100')
lbl = Label(window, text="Input IP address")
lbl.grid(column=0, row=0)
txt = Entry(window,width=20)
txt.grid(column=1, row=0)


out = Label(window, text="")
out.grid(column=1, row=4)
out_label = Label(window, text="Output: ")
out_label.grid(column=0, row=4)


def clicked():
    res=str(txt.get())
    url_val=res          
    out.configure(text= "Begining")
    print(url_val)
    flag = True
    
    thread1 = threading.Thread(target = route, args = (url_val,))
    thread1.start()
def unclicked():
    out.configure(text= "Stopped")
    flag = False   
    url_val=""
     
btn = Button(window, text="GO", command=clicked)
btn.grid(column=3, row=0)

btn2 = Button(window, text="GO", command=unclicked)
btn2.grid(column=5, row=0)

window.mainloop()