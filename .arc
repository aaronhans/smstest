# Warning: do not edit
# --------------------
# This is a generated file and will be overwritten

@app
begin-app

@http
get /
post /sms

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
