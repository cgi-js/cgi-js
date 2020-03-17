import os

dictions = {}

def return_statement():
    for k, v in os.environ.items():
        dictions[k] = v
    return str(dictions)

print(return_statement())
