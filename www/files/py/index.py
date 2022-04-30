# License: MIT
# Dynamic CGI serving using dynamic path imports for 
#          CGI supporting executable for Interpreted languages Embedded Distribution
# Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 


import os

dictions = {}

def return_statement():
    for k, v in os.environ.items():
        dictions[k] = v
    return str(dictions)

print(return_statement())
print("Python Version of the page")
