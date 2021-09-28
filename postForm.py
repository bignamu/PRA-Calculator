import requests

req = requests.post('http://www.pra-calculator.kr/form/view.html',{'qa[]':'1,2,3'})

print(req)
