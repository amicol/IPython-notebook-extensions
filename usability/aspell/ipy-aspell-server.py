# -*- coding: utf-8 -*-
"""
# Copyright (C) 2013

#  Distributed under the terms of the BSD License.  The full license is in
#  the file COPYING, distributed as part of this software. 

@author: juhasch
"""

""" 
Tornado web server to 
 push value received from Pyzmq pull messages
 to web browser using a webscocket connection 
"""                         

import time
import os.path

import tornado.web
import tornado.websocket
import tornado.ioloop

import random
import json
import aspell

from zmq.eventloop import ioloop, zmqstream

webport = 8989 # port address for web client
 
s = aspell.Speller('lang', 'fr')
enc = s.ConfigKeys()[8][2] 
GLOBALS={
    'sockets': []
}
 
class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
            return True
    def open(self): 
        print "open socket"
        GLOBALS['sockets'].append(self)
        
    def on_close(self):
        print "on_close"
        GLOBALS['sockets'].remove(self)

    def on_message(self, message):
        x=json.loads(message)
        text = x['text']
        try:
                reply = s.check(text.encode(enc))
                # reply to request:
                #  check  1 for OK, 0 for not a valid word
                #  id     cell_id
                #  line   codemirror line number
                #  start  codemirror start position of word
                #  stop   codemirror end position of word
                reply = {"check": reply, "id" : x['id'], "line": x['line'], 
                        "start" : x['start'], "end": x['end'] }
                self.write_message(reply)
        except:
                reply = {"check": 0, "id" : x['id'], "line": x['line'],
                         "start" : x['start'], "end": x['end'] }
                self.write_message(reply)
 
application = tornado.web.Application([
    (r"/websocket", WebSocketHandler),
])

if __name__ == "__main__":
    ioloop.install()

    application.listen(webport)
    main_loop = tornado.ioloop.IOLoop.instance()
    main_loop.start()
    print "Running"
