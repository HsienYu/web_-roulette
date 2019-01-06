from selenium import webdriver	  
import time 
from selenium.webdriver.common.keys import Keys 

firefoxProfile = webdriver.FirefoxProfile()
firefoxProfile.set_preference('permissions.default.stylesheet', 2)
firefoxProfile.set_preference('permissions.default.image', 2)
firefoxProfile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so','false')
firefoxProfile.set_preference('dom.webnotifications.enabled','false')
firefoxProfile.set_preference("http.response.timeout", 5)
firefoxProfile.set_preference("dom.max_script_run_time", 5)

# Creating an instance webdriver 
browser = webdriver.Firefox(firefox_profile=firefoxProfile) 



f = open("log.txt")
lines = f.readlines()
while lines >= 0:
    for line in lines:
        some_var = line[:5]
        if some_var == 'https':
            try:
                browser.set_page_load_timeout(10)
                browser.get(line)
                print line
                time.sleep(2)
            except:
                print 'time out'
                

        else:
            try:
                browser.get('https://www.google.com/')
                print line
                time.sleep(2)
            except:
                print 'time out'


# closing the browser 
#browser.close()