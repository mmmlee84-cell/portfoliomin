#!/usr/bin/env python3
"""로컬 미리보기 서버 — 브라우저 캐시를 끄고 항상 최신 파일을 내려준다.

사용법:  python3 serve.py        (기본 8000 포트)
         python3 serve.py 8080   (포트 지정)
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_response(self, *args, **kwargs):
        super().send_response(*args, **kwargs)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with ThreadingHTTPServer(("", port), NoCacheHandler) as httpd:
        print(f"http://localhost:{port}  (캐시 비활성화)")
        httpd.serve_forever()
