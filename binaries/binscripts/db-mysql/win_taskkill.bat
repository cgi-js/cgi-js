@echo off
:LOOP
@REM tasklist | find /i "mysqld.exe">nul  && Taskkill /F /IM  "mysqld.exe" & exit/b
wmic process | find /i "binaries\\db-mysql\\win\\bin\\mysqld.exe">nul && Taskkill /F /IM  "mysqld.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "mysqld.exe" & exit/b
timeout /t 30
goto:LOOP
