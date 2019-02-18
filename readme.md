# Chartable Datatable Plugin for AngularJS

Chartable is a very light, compact and easy to use automated chart supported datatable plug-in for AngularJS apps. It uses Highcharts charting libraries, font-awesome icons and bootstrap 4. It can handle easily the changes in your dataset. Chartable is in beta version for now. Please don't hesitate to contact for your questions and suggestions. I also will be glad if you want to contribute. 

E-mail: cnsnmms@gmail.com

## Basic Usage

It will be very easy. You can use the test.html inside the package after install. 

If you want go yourself please load following libraries.

```html
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
    crossorigin="anonymous" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="chartable-angular.js"></script>
```

Inject chartable directive in to your angularJs app and create a Chartable component. Pass a javascript object array, an index number for generating multiple chartable elements and a title for your table as follows. Thats it.

```html
<chartable dtmodel="dt" idx="1" title="Table 1"></chartable>
var app = angular.module("myApp", ["chartable"]);
```

 ## Visual Examples

![alt text](https://s2.gifyu.com/images/chartable1.jpg)
![alt text](https://s2.gifyu.com/images/chartable2.jpg)
![alt text](https://s2.gifyu.com/images/chartable3.jpg)
