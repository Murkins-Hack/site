@echo off
chcp 65001 >nul
title MURK1INSHOPSPORTFOLIO — РАЗДАЧА САЙТА
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0share.ps1"
