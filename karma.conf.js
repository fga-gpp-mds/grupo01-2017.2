// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--headless', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=9222']
        }
    },
    reporters: ['coverage-istanbul', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 30000,
    singleRun: false
  });

  if(process.env.TRAVIS){
    config.browsers = ['Chrome_travis_ci'];
  }
};
