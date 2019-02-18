angular.module("chartable", []).directive("chartable", function () {
  var ctrl = [
    "$scope",
    function ($scope) {
      //Event Handlers
      $scope.$watch('dtmodel', function () {
        $scope.copy = angular.copy($scope.dtmodel);
        $scope.searchRows();
        if ($scope.sortToggle != null) {
          if (!$scope.sortToggle) {
            $scope.copy.sort((a, b) =>
              a[$scope.sortIndex] > b[$scope.sortIndex] ? 1 : b[$scope.sortIndex] > a[$scope.sortIndex] ? -1 : 0
            );
          } else {
            $scope.copy.sort((a, b) =>
              a[$scope.sortIndex] > b[$scope.sortIndex] ? -1 : b[$scope.sortIndex] > a[$scope.sortIndex] ? 1 : 0
            );
          }
        }
      }, true);

      $scope.refresh = function () {
        $scope.copy = angular.copy($scope.dtmodel);
        $scope.searchTxt = "";
        $scope.sortToggle = true;
        $scope.sortIndex = null;
      }

      $scope.pageLengthChange = function () {
        $scope.activeData = [];
        var n = parseInt($scope.pageLengthActive);
        if (n > $scope.copy.length) n = $scope.copy.length;
        $scope.pagingActive = "1";
        $scope.activeData = $scope.createIndArr(n, 0);
        $scope.tblPages = $scope.createIndArr(
          Math.ceil($scope.copy.length / parseInt($scope.pageLengthActive)),
          1
        );
      };

      $scope.pagingChange = function (i) {
        $scope.pagingActive = i;
        $scope.activeData = [];
        var start = (parseInt(i) - 1) * parseInt($scope.pageLengthActive);
        var n = parseInt($scope.pageLengthActive);
        $scope.activeData = $scope.createIndArr(n, start);
      };

      $scope.filterChange = function (n) {
        $scope.tblPages = $scope.createIndArr(
          Math.ceil(n / $scope.pageLengthActive),
          1
        );
        $scope.pagingActive = "1";
        var n = parseInt($scope.pageLengthActive);
        $scope.activeData = $scope.createIndArr(n, 0);
      };

      $scope.searchRows = function () {
        $scope.copy = angular.copy($scope.dtmodel);
        if (
          $scope.searchTxt == "" ||
          $scope.searchTxt.length == 0 ||
          $scope.searchTxt == null
        ) {
          $scope.pageLengthChange();
        } else {
          $scope.copy = $scope.findSearchTxt(
            angular.copy($scope.dtmodel),
            $scope.searchTxt
          );
          $scope.filterChange($scope.copy.length);
        }
      };

      $scope.sortData = function (i) {
        $scope.sortIndex = i;
        if ($scope.sortToggle) {
          $scope.sortToggle = false;
          $scope.copy.sort((a, b) =>
            a[i] > b[i] ? 1 : b[i] > a[i] ? -1 : 0
          );
        } else {
          $scope.sortToggle = true;
          $scope.copy.sort((a, b) =>
            a[i] > b[i] ? -1 : b[i] > a[i] ? 1 : 0
          );
        }
      };

      //Helpers      
      $scope.next = function () {
        $scope.pagingActive = (parseInt($scope.pagingActive) + 1).toString();
      }

      $scope.prev = function () {
        $scope.pagingActive = (parseInt($scope.pagingActive) - 1).toString();
      }

      $scope.toInt = function (val) {
        return parseInt(val);
      }

      $scope.findSearchTxt = function (objects, txt) {
        var res = [];
        for (var i = 0; i < objects.length; i++) {
          for (key in objects[i]) {
            if (objects[i][key].toString().includes(txt)) {
              res.push(objects[i]);
              break;
            }
          }
        }
        return res;
      };

      $scope.createIndArr = function (n, start) {
        var res = [];
        for (i = 0; i < n; i++) {
          res.push(i + start);
        }
        return res;
      };

      $scope.getCol = function (matrix, col) {
        var column = [];
        for (var i = 0; i < matrix.length; i++) {
          column.push(matrix[i][col]);
        }
        return column;
      };

      //Chart Methods
      $scope.drawChart = function () {
        switch ($scope.chartType) {
          case "line":
            $scope.drawLine();
            break;
          case "area":
            $scope.drawArea();
            break;
          case "column":
            $scope.drawColumn();
            break;
          case "bar":
            $scope.drawBar();
            break;
          case "scatter":
            $scope.drawScatter();
            break;
          default:
            $scope.drawLine();
        }
      };

      $scope.drawLine = function () {
        var sr = [];
        for (i = 0; i < $scope.selectedData.length; i++) {
          var newObj = {};
          newObj.name = $scope.columns[parseInt($scope.selectedData[i])];
          newObj.data = $scope.getCol(
            $scope.copy,
            $scope.columns[$scope.selectedData[i]]
          );
          sr.push(newObj);
        }

        Highcharts.chart("chartableChart" + $scope.idx, {
          credits: { enabled: false },
          title: {
            text: "Line Chart"
          },
          yAxis: {
            title: {
              text: "Values"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              }
            }
          },
          series: sr,
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        });
      };

      $scope.drawArea = function () {
        var sr = [];
        for (i = 0; i < $scope.selectedData.length; i++) {
          var newObj = {};
          newObj.name = $scope.columns[parseInt($scope.selectedData[i])];
          newObj.data = $scope.getCol(
            $scope.copy,
            $scope.columns[$scope.selectedData[i]]
          );
          sr.push(newObj);
        }

        Highcharts.chart("chartableChart" + $scope.idx, {
          credits: { enabled: false },
          chart: {
            type: "area"
          },
          title: {
            text: "Area Chart"
          },
          yAxis: {
            title: {
              text: "Values"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            area: {
              stacking: "normal",
              lineColor: "#666666",
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: "#666666"
              }
            }
          },
          series: sr,
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        });
      };

      $scope.drawColumn = function () {
        var sr = [];
        for (i = 0; i < $scope.selectedData.length; i++) {
          var newObj = {};
          newObj.name = $scope.columns[parseInt($scope.selectedData[i])];
          newObj.data = $scope.getCol(
            $scope.copy,
            $scope.columns[$scope.selectedData[i]]
          );
          sr.push(newObj);
        }

        Highcharts.chart("chartableChart" + $scope.idx, {
          credits: { enabled: false },
          chart: {
            type: "column"
          },
          title: {
            text: "Column Chart"
          },
          yAxis: {
            title: {
              text: "Values"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: sr,
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        });
      };

      $scope.drawBar = function () {
        var sr = [];
        for (i = 0; i < $scope.selectedData.length; i++) {
          var newObj = {};
          newObj.name = $scope.columns[parseInt($scope.selectedData[i])];
          newObj.data = $scope.getCol(
            $scope.copy,
            $scope.columns[$scope.selectedData[i]]
          );
          sr.push(newObj);
        }

        Highcharts.chart("chartableChart" + $scope.idx, {
          credits: { enabled: false },
          chart: {
            type: "bar"
          },
          title: {
            text: "Bar Chart"
          },
          yAxis: {
            title: {
              text: "Values"
            }
          },
          xAxis: {
            title: {
              text: "Bars"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true
              }
            }
          },
          series: sr,
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        });
      };

      $scope.drawScatter = function () {
        var sr = [];
        for (i = 0; i < $scope.selectedData.length; i++) {
          var newObj = {};
          newObj.name = $scope.columns[parseInt($scope.selectedData[i])];
          newObj.data = $scope.getCol(
            $scope.copy,
            $scope.columns[$scope.selectedData[i]]
          );
          sr.push(newObj);
        }

        Highcharts.chart("chartableChart" + $scope.idx, {
          credits: { enabled: false },
          chart: {
            type: "scatter"
          },
          title: {
            text: "Scatter Plot"
          },
          yAxis: {
            title: {
              text: "Values"
            }
          },
          xAxis: {
            title: {
              text: "Observation"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                states: {
                  hover: {
                    enabled: true,
                    lineColor: "rgb(100,100,100)"
                  }
                }
              },
              states: {
                hover: {
                  marker: {
                    enabled: false
                  }
                }
              }
            }
          },
          series: sr,
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        });
      };

      //Init      
      $scope.columns = Object.keys(angular.copy($scope.dtmodel[0]));
      $scope.copy = angular.copy($scope.dtmodel);
      $scope.chartModal = "chartModal" + $scope.idx;
      $scope.selectedData = [];
      $scope.chartType = "line";
      $scope.pageLength = [5, 10, 20];
      $scope.pageLengthActive = "5";
      $scope.pagingActive = "1";
      $scope.searchTxt = "";
      $scope.sortToggle = true;
      $scope.sortIndex = null;
      $scope.tableTitle = angular.isDefined($scope.title) ? $scope.title : "";
      $scope.activeData = $scope.createIndArr(
        parseInt($scope.pageLengthActive),
        0
      );

      $scope.tblPages = $scope.createIndArr(
        Math.ceil($scope.copy.length / $scope.pageLength[0]),
        1
      );
    }
  ];
  return {
    restrict: "EA",
    scope: {
      dtmodel: "=",
      title: "@",
      idx: "@"
    },
    controller: ctrl,
    templateUrl: "chartable.html"
  };
});
