@echo off
:LOOP
@REM tasklist | find /i "tomcat.exe">nul  && Taskkill /F /IM  "tomcat.exe" & exit/b
wmic process | find /i "binaries\\server-httpd\\win\\tomcat.exe">nul && Taskkill /F /IM  "tomcat.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "tomcat.exe" & exit/b
timeout /t 30
goto:LOOP
