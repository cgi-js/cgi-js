@echo off
:LOOP
@REM tasklist | find /i "redis.exe">nul  && Taskkill /F /IM  "redis.exe" & exit/b
wmic process | find /i "binaries\\db-redis\\win\\redis.exe">nul && Taskkill /F /IM  "redis.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "redis.exe" & exit/b
timeout /t 30
goto:LOOP
