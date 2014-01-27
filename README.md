CodeMontage Hacathon January 18th 2013

#### Configuration
Because this is an open source project, I want to avoid storing sensitive information in my repo.
This is a good practice in general and one I do regularly anyway - I hate credentials in files.

To that end, I've allowed an external json file to override basic "sane" development defaults
like localhost mongo.

Production Theory: external file that is 600 to the web process user so that only the web process
may access it. This is a great way to avoid people opening the file with less then root privileges.

Example:

    #shell
    CONFIG=~/config.js grunt serve

```javascript
/**
 * Why .js and not JSON? Because complex configurations like a mailer can have
 * just .mail({}) or something as complex as the SMPT example below
 * This allows you to go crazy in an external, secured file for your system
 */
var nodemailer = require("nodemailer"),
module.exports = {
  mongo: {
    uristring: ''
  },
  mailer: function() {
    //example of best implementation
    //var smtpTransport = nodemailer.createTransport("SMTP",{
    //    service: "Gmail",
    //    auth: {
    //        user: "gmail.user@gmail.com",
    //        pass: "userpass"
    //    }
    //});
    return nodemailer;
  }
}
```