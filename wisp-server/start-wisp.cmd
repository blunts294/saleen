@echo off
title Saleen relay
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-wisp.ps1"
if errorlevel 1 pause
