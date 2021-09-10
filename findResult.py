import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time
import copy
import pandas as pd
import os
import urllib.request

from itertools import combinations

df = pd.DataFrame()
options = Options()


# webdriver 경로 설정
driver = webdriver.Chrome('H:\chromedriver.exe')
driver.set_window_size(1600, 900)


# 주소
path = 'http://cpra.inforang.com/form/form.html'

driver.get(url=path)

driver.implicitly_wait(3)

# Check all A unacceptable antigens:
A_antigens = driver.find_elements_by_name('qa[]')

# Check all B unacceptable antigens:
B_antigens = driver.find_elements_by_name('qb[]')

# Bw4/6:
Bw = driver.find_elements_by_name('qbw')

# Check all C unacceptable antigens
C_antigens = driver.find_elements_by_name('qc[]')

# Check all DR unacceptable antigens:
DR_antigens = driver.find_elements_by_name('qdr[]')

# Check all DR 51/52/53 unacceptable antigens:
DR5123 = []
DR5123.append(driver.find_element_by_name('qdr51'))
DR5123.append(driver.find_element_by_name('qdr52'))
DR5123.append(driver.find_element_by_name('qdr53'))

# Check all DQ unacceptable antigens:
DQ = driver.find_elements_by_name('qdq[]')

datas = {
    'qa[]': '',
    'qb[]': '',
    'qbw': '',
    'qc[]': '',
    'qdr[]': '',
    'qdr51': '',
    'qdq[]': ''

}

def makelist(antigens):
    temp = []
    for a in antigens:
        temp.append(a.get_attribute('value'))
    return temp

target = [A_antigens,B_antigens,Bw,C_antigens,DR_antigens,DR5123,DQ]
value_list = []
for t in target:
    value_list.append(makelist(t))

print(value_list)

    


# -------------------------밑에는 필요없음----------------------------
exit()
# only click
def checkComb(antigens):
    for len in range(antigens.__len__()+1):
    
        for comb in combinations(antigens,len):
            
            for check in comb:
                check.click()
            

# checkComb(A_antigens)
# A start
for A_len in range(len(A_antigens)+1):

    for A_comb in combinations(A_antigens,A_len):
        
        for A_check in A_comb:
            A_check.click()

    # B start   
    for B_len in range(len(B_antigens)+1):

        for B_comb in combinations(B_antigens,B_len):
            
            for B_check in B_comb:
                B_check.click()
                
        # Bw start
        for Bw_comb in combinations(Bw,1):
                
            for Bw_check in Bw_comb:
                if Bw_check:
                    Bw_check.click()

            # C start
            for C_len in range(len(C_antigens)+1):

                for C_comb in combinations(C_antigens,C_len):
                    
                    for C_check in C_comb:
                        C_check.click()

                # DR start
                for DR_len in range(len(DR_antigens)+1):

                    for DR_comb in combinations(DR_antigens,DR_len):
                        
                        for DR_check in DR_comb:
                            DR_check.click()

                    # DR5123 start
                    for DR5123_len in range(len(DR5123)+1):

                        for DR5123_comb in combinations(DR5123,DR5123_len):
                            
                            for DR5123_check in DR5123_comb:
                                if DR5123_check:
                                    DR5123_check.click()
                        # DQ start
                        for DQ_len in range(len(DQ)+1):

                            for DQ_comb in combinations(DQ,DQ_len):
                                
                                if len(DQ_comb) != 1:
                                    for DQ_check in DQ_comb:
                                        DQ_check.click()
                                else:
                                    DQ_comb[0].click()


                            
                            driver.find_element_by_class_name('bt_style1').click()
                            result = driver.find_elements_by_css_selector('.values')
                            temp_dict = {}
                            for r,n in zip(result,dfname):
                                temp_dict[n] = r.text
                                print(n,r.text)

                            val = driver.find_elements_by_css_selector('.clearfix:nth-child(18)')
                            temp_dict['CPRA VALUE'] = val
                
                            df = df.append(temp_dict,ignore_index=True)
                            driver.find_element_by_css_selector('.bt_style2').click()
                            driver.find_element_by_class_name('bt_style2').click()
                            
                            
                            # exit()
                            



            






    

# driver.close()