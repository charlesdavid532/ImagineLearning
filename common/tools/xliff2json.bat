:START_LINE
@echo off

set /p module="Enter Folder Name: " %=%

IF [%module%]==[] GOTO NO_ARGUMENT

echo Begin conversion

cd ..\..\config
grunt xliff2json:%module%:false & pause
goto :eof

:NO_ARGUMENT
echo Invalid input parameters
goto :START_LINE