@REM for %%parameter IN ('tasklist /fi "ImageName eq nginx.exe"') do echo %%parameter

@REM https://superuser.com/questions/768984/show-exe-file-path-of-running-processes-on-the-command-line-in-windows
@REM https://superuser.com/questions/768984/show-exe-file-path-of-running-processes-on-the-command-line-in-windows
@REM wmic process where "ExecutablePath like 'c:\\nginx\\nginx%'" get ProcessID

@REM wmic process where "ExecutablePath like 'c:\\nginx\\nginx%'" get ProcessID, Name, ExecutablePath

@REM for /f "tokens=1" %%A in ('wmic process where \"ExecutablePath like \'c:\\nginx\\nginx%\'\" get ProcessID 1>NUL') do echo %%A

@REM netstat -ano | findstr :%1 | ( set /P var= && set var )
@REM taskkill var

@REM for /F %%I in ('netstat -ano | findstr :9000') do set "a=%%I"
@REM taskkill %a%

@REM wmic process where "ExecutablePath like 'c:\\nginx\\nginx%'" get ProcessID 1>NUL
@REM for /F "tokens=*" %%A in (test.log) do echo %%A

wmic process
