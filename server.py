import os
import re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()
        
        # Check for Range header
        range_header = self.headers.get('Range')
        if not range_header:
            return super().send_head()
            
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            return super().send_head()
            
        file_size = os.path.getsize(path)
        start = int(match.group(1))
        end = match.group(2)
        end = int(end) if end else file_size - 1
        
        if start >= file_size:
            self.send_error(416, "Requested range not satisfiable")
            return None
            
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        
        f = open(path, 'rb')
        f.seek(start)
        return f

    def copyfile(self, source, outputfile):
        # We need to make sure we only copy the range if it was requested
        range_header = self.headers.get('Range')
        if not range_header:
            return super().copyfile(source, outputfile)
            
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            return super().copyfile(source, outputfile)
            
        file_size = os.path.getsize(self.translate_path(self.path))
        start = int(match.group(1))
        end = match.group(2)
        end = int(end) if end else file_size - 1
        
        bytes_to_send = end - start + 1
        buffer_size = 64 * 1024
        
        try:
            while bytes_to_send > 0:
                chunk = source.read(min(bytes_to_send, buffer_size))
                if not chunk:
                    break
                outputfile.write(chunk)
                bytes_to_send -= len(chunk)
        except (ConnectionResetError, ConnectionAbortedError):
            # Gracefully handle connection resets (e.g. user seeking/navigating away)
            pass

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

if __name__ == '__main__':
    port = 8000
    max_port_attempts = 10
    server = None
    for attempt in range(max_port_attempts):
        try:
            server = ThreadedHTTPServer(('127.0.0.1', port), RangeRequestHandler)
            break
        except OSError as e:
            if e.errno == 98 or e.errno == 10048: # Port already in use
                print(f"Port {port} is in use, trying next port...")
                port += 1
            else:
                raise e

    if server is None:
        print("Error: Could not find an available port.")
    else:
        print(f"Serving at http://127.0.0.1:{port} (Threaded with Range Requests support)...")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
