from itertools import combinations
import pandas as pd
import requests
import time
from bs4 import BeautifulSoup

antigens_dict = {}
antigens_dict['A'] = ['1', '2', '3', '11', '23', '24', '25', '26', '28', '29', '30', '31', '32', '33', '34', '36', '43', '66', '68', '69', '74', '80']
antigens_dict['B'] = ['7', '8', '13', '14', '15', '18', '27', '35', '37', '38', '39', '40', '41', '42', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '67', '70', '71', '72', '73', '75', '76', '77', '78', '81', '82']
antigens_dict['Bw4/6'] = ['4', '6', 'N/A']
antigens_dict['C'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '14', '15', '16', '17', '18']
antigens_dict['DR'] = ['1', '2', '3', '4', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
antigens_dict['DR 51/52/53'] = ['51', '52', '53']
antigens_dict['DQ'] = ['2', '3', '4', '5', '6', '7', '8', '9']


result = pd.DataFrame()



post_url = 'http://cpra.inforang.com/form/view.html'

datas = {
    'qa[]': '',
    'qb[]': '',
    'qbw': '',
    'qc[]': '',
    'qdr[]': '',
    'qdr51': '',
    'qdq[]': ''

}
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}





idx = 0
# A
for A_len in range(len(antigens_dict['A'])+1):

    for A_comb in combinations(antigens_dict['A'],A_len):
        
        # B
        for B_len in range(len(antigens_dict['B'])+1):
        
            for B_comb in combinations(antigens_dict['B'],B_len):
            
                # Bw
                for Bw_len in range(1):
            
                    for Bw_comb in combinations(antigens_dict['Bw4/6'],Bw_len):
                        
                        # C
                        for C_len in range(len(antigens_dict['C'])+1):
                    
                            for C_comb in combinations(antigens_dict['C'],C_len):
                                # DR
                                for DR_len in range(len(antigens_dict['DR'])+1):
                            
                                    for DR_comb in combinations(antigens_dict['DR'],DR_len):
                                        # DR 5123
                                        for DR5123_len in range(len(antigens_dict['DR 51/52/53'])+1):
                                    
                                            for DR5123_comb in combinations(antigens_dict['DR 51/52/53'],DR5123_len):
                                                # DQ
                                                for DQ_len in range(len(antigens_dict['DQ'])+1):
                                            
                                                    for DQ_comb in combinations(antigens_dict['DQ'],DQ_len):
                                                        temp_data = datas
                                                        temp_data['qa[]'] = list(A_comb)
                                                        temp_data['qb[]'] = list(B_comb)
                                                        temp_data['qbw'] = list(Bw_comb)
                                                        temp_data['qc[]'] = list(C_comb)
                                                        temp_data['qdr51'] = '51' if '51' in list(DR5123_comb) else ''
                                                        temp_data['qdr52'] = '52' if '52' in list(DR5123_comb) else ''
                                                        temp_data['qdr53'] = '53' if '53' in list(DR5123_comb) else ''
                                                        temp_data['qdq[]'] = list(DQ_comb)
                                                        while 1:
                                                            try:
                                                                res = requests.post(post_url,data= temp_data,headers=headers)
                                                                break
                                                            except:
                                                        
                                                                time.sleep(5)
                                                                res = requests.post(post_url,data= temp_data,headers=headers)
                                                                print('재연결')
                                                        
                                                        soup = BeautifulSoup(res.text,'html.parser')
                                                        CPRA = soup.select('#Inner > div > div > div:nth-child(18)')
                                                        cpra_val = CPRA[0].contents[0].strip().split()[3]
                                                        

                                                        temp_data['CPRA'] = cpra_val
                                                        result = result.append(temp_data,ignore_index=True)
                                                        if idx % 10 == 0:
                                                    
                                                            print(f'{idx}번째 실행중')
                                                        idx += 1

                                                        # print(result)

                                                        


result.to_csv('csvdata.csv')
result.to_excel('excelldata.xlsx')
# res = requests.post(post_url,data=datas,headers=headers)

# soup = BeautifulSoup(res.text,'html.parser')
# CPRA = soup.select('#Inner > div > div > div:nth-child(18)')

# print(CPRA[0].contents[0].strip().split()[3])