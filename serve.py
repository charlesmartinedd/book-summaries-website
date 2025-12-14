#!/usr/bin/env python3
"""
Simple HTTP server for previewing the book summaries website.
Run: python serve.py
Then open: http://localhost:8080
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080

os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    webbrowser.open(f"http://localhost:{PORT}")
    httpd.serve_forever()
