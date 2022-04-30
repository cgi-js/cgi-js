# https://stackoverflow.com/questions/2572371/python-equivalent-to-phpinfo
import platform
import os
import sys

print("sys.version", sys.version)
print("sys.platform", sys.platform)
print("sys.modules.keys()", sys.modules.keys())

print("os.name", os.name)

print("platform.architecture()", platform.architecture())
print("platform.machine()", platform.machine())
