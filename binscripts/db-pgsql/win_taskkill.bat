@echo off
:LOOP
@REM tasklist | find /i "pg_ctl.exe">nul  && Taskkill /F /IM  "pg_ctl.exe" & exit/b
wmic process | find /i "binaries\\db-pgsql\\win\\pg_ctl.exe">nul && Taskkill /F /IM  "pg_ctl.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "pg_ctl.exe" & exit/b
timeout /t 30
goto:LOOP
