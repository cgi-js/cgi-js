@echo off
:LOOP
@REM tasklist | find /i "mongod.exe">nul  && Taskkill /F /IM  "mongod.exe" & exit/b
wmic process | find /i "binaries\\db-mongo\\win\\bin\\mongod.exe">nul && Taskkill /F /IM  "mongod.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "mongod.exe" & exit/b
timeout /t 30
goto:LOOP
