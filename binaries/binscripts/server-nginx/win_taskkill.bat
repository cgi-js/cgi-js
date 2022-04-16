@REM taskkill /IM nginx.exe /F


@REM for /f "tokens=2" %%A in ('tasklist ^| findstr /i "nginx.exe" 2^>NUL') do taskkill /F /PID %%A
@REM for /f "tokens=2" %%A in ('netstat -ano ^| findstr ":9000" 2^>NUL') do taskkill /F /PID %%A

@REM Stop-Process -ID PID -Force


@REM https://stackoverflow.com/questions/206114/batch-files-how-to-read-a-file
@REM FOR /F %%i IN (C:\nginx\logs\nginx.pid) DO taskkill /F /PID %%i
@REM FOR /F %%i IN (C:\nginx\logs\nginx.pid) DO nginx


@REM https://serverfault.com/questions/842423/how-to-completely-kill-nginx-in-windows
@REM
@REM WORKING
@REM
@REM unnamed first argument - path
@REM


@REM NEEDED - MAKE THIS VALID AND BAT FILE DYNAMIC
@REM set pathvalue=%1
@REM echo input: %pathvalue%

@echo off
:LOOP
@REM tasklist | find /i "nginx.exe">nul  && Taskkill /F /IM  "nginx.exe" & exit/b
wmic process | find /i "binaries\\server-nginx\\win\\nginx.exe">nul && Taskkill /F /IM  "nginx.exe" & exit/b
@REM wmic process | find /i %pathvalue%>nul && Taskkill /F /IM  "nginx.exe" & exit/b
timeout /t 30
goto:LOOP
