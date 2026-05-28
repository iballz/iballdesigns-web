import urllib.request
import re

url = 'https://my.spline.design/voiceinteractionanimation-0bX7fUHx9rB6ndOtlD7ma2mk/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'https://prod\.spline\.design/[^\"\'\s]+', html)
    if match:
        print("FOUND:", match.group(0))
    else:
        print("NO MATCH FOUND")
except Exception as e:
    print("ERROR:", e)
