@echo off
:LOOP
@REM tasklist | find /i "some.exe">nul  && Taskkill /F /IM  "some.exe" & exit/b
wmic process | find /i "binaries\\db-pgsql\\win\\some.exe">nul && Taskkill /F /IM  "some.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "some.exe" & exit/b
timeout /t 30
goto:LOOP
