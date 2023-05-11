class ErrorHandler {
  // convenience wrappers on writeCustomError
  static info(message, err=undefined) {
    ErrorHandler.writeCustomError(message,'info',err);
  }
  static warn(message, err=undefined) {
    ErrorHandler.writeCustomError(message,'warn',err);
  }
  static error(message, err=undefined) {
    ErrorHandler.writeCustomError(message,'error',err);
  }

  // Custom error handler to output in the QoL error console
  // Level should be info, warn, or error; default is info
  // Message is also written to the JavaScript console
  // err should be the full Error object - if provided and supported, the 
  //     stack trace for this error will be Base 64 encoded and included for the user
  static writeCustomError(message,level='info',err=undefined) {
      const logElement = document.getElementById('qolConsoleHolder');
      if(logElement) {
          logElement.innerHTML += '<li>' + ErrorHandler.errorToString(message, level, err) +'</li>';
      }
      else {
          console.error('Could not add custom log to log element');
      }
  }
  // show an error at the bottom of the page, since the hub may not be accessible in these cases
  static fatalErrorHandler(err) {
    // prevent showing the fatal error output while logged out, and on non-core pages like direct image links
    if(err!='#announcements missing') {
      let message = 'Fatal error initializing QoL'
      console.error(message);
      console.error(err);
      let errorMsg = ErrorHandler.errorToString(message, 'error', err);
      $('#core').append('<div class="panel" style="padding:0.5rem;word-wrap:break-word;user-select:all;">'+errorMsg+'</div>');
    }
  }
  // translates the given details into a printable version
  // logs the message to the console at the same time
  static errorToString(message, level='info', err=undefined) {
      let prefix = undefined;
      let stackTrace = '';
      if(err && err.stack) {
          stackTrace = '<br>'+btoa(err.stack);
      }
      if(level=='warn') {
          prefix = 'WARN: ';
          console.warn('QoL: '+message);
      }
      else if(level=='error') {
          prefix = 'ERROR: ';
          console.error('QoL: '+message);
      }
      else {
          prefix = 'INFO: ';
          console.log('QoL: '+message);
      }
      return prefix + message + stackTrace;
  }
}