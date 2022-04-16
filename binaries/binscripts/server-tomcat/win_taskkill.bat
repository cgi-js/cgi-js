@echo off
:LOOP
@REM tasklist | find /i "tomcat10.exe">nul  && Taskkill /F /IM  "tomcat10.exe" & exit/b
wmic process | find /i "binaries\\server-httpd\\win\\tomcat10.exe">nul && Taskkill /F /IM  "tomcat10.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "tomcat10.exe" & exit/b
timeout /t 30
goto:LOOP
