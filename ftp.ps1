$Session = New-PSSession -ComputerName "inlowearthorbit.com" -Credential "rlewis8\InLEOp@55"
Copy-Item "c:\inetpub\wwwroot\projects\arena" -Destination "arena\" -ToSession $Session -Recurse

Copy-Item "c:\inetpub\wwwroot\projects\arena" -Destination "arena\" -ToSession (New-PSSession -ComputerName "inlowearthorbit.com" -Credential "rlewis8\InLEOp@55") -Recurse


#copy *.* ftp://inlowearthorbit.com/arena/ -Recurse