;(function () {
  'use strict'

  /* imports */
  var Task = require('data.task')

  /* exports */
  module.exports = taskTimeout

  function taskTimeout (task, duration) {
    return new Task(function (onError, onSuccess) {
      var timeout = setTimeout(function () {
        onError(Error('timeout of ' + duration + ' ms exceeded.'))
      }, duration)

      task.fork(clear(timeout, onError), clear(timeout, onSuccess))

      function clear (timeout, callback) {
        return function (result) {
          if (!timeout._called) {
            clearTimeout(timeout)

            callback(result)
          }
        }
      }
    })
  }
})()

