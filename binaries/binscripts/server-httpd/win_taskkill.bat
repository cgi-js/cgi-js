@echo off
:LOOP
@REM tasklist | find /i "httpd.exe">nul  && Taskkill /F /IM  "httpd.exe" & exit/b
wmic process | find /i "binaries\\server-httpd\\win\\bin\\httpd.exe">nul && Taskkill /F /IM  "httpd.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "httpd.exe" & exit/b
timeout /t 30
goto:LOOP
