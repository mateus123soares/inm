module.exports = {

  instanceDashboard(name, host, ip) {
    const dashboard = {
      Dashboard: {
        "annotations": {
          "list": [
            {
              "builtIn": 1,
              "datasource": {
                "type": "datasource",
                "uid": "grafana"
              },
              "enable": true,
              "hide": true,
              "iconColor": "rgba(0, 211, 255, 1)",
              "name": "Annotations & Alerts",
              "target": {
                "limit": 100,
                "matchAny": false,
                "tags": [],
                "type": "dashboard"
              },
              "type": "dashboard"
            }
          ]
        },
        "editable": true,
        "fiscalYearStartMonth": 0,
        "graphTooltip": 0,
        "id": null,
        "iteration": 1654566956151,
        "links": [],
        "liveNow": false,
        "panels": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "P951FEA4DE68E13C5"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "palette-classic"
                },
                "custom": {
                  "axisGridShow": true,
                  "axisLabel": "",
                  "axisPlacement": "auto",
                  "barAlignment": 0,
                  "drawStyle": "line",
                  "fillOpacity": 7,
                  "gradientMode": "none",
                  "hideFrom": {
                    "legend": false,
                    "tooltip": false,
                    "viz": false
                  },
                  "lineInterpolation": "linear",
                  "lineStyle": {
                    "fill": "solid"
                  },
                  "lineWidth": 1,
                  "pointSize": 3,
                  "scaleDistribution": {
                    "type": "linear"
                  },
                  "showPoints": "always",
                  "spanNulls": true,
                  "stacking": {
                    "group": "A",
                    "mode": "normal"
                  },
                  "thresholdsStyle": {
                    "mode": "off"
                  }
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    }
                  ]
                },
                "unit": "decbytes"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 0,
              "y": 0
            },
            "id": 21,
            "options": {
              "legend": {
                "calcs": [
                  "lastNotNull"
                ],
                "displayMode": "list",
                "placement": "bottom"
              },
              "tooltip": {
                "mode": "single",
                "sort": "asc"
              }
            },
            "targets": [
              {
                "datasource": {
                  "type": "influxdb",
                  "uid": "P951FEA4DE68E13C5"
                },
                "groupBy": [
                  {
                    "params": [
                      "$__interval"
                    ],
                    "type": "time"
                  },
                  {
                    "params": [
                      "null"
                    ],
                    "type": "fill"
                  }
                ],
                "measurement": "host:traffic",
                "orderByTime": "ASC",
                "policy": "default",
                "refId": "A",
                "resultFormat": "time_series",
                "select": [
                  [
                    {
                      "params": [
                        "bytes_rcvd"
                      ],
                      "type": "field"
                    },
                    {
                      "params": [],
                      "type": "mean"
                    }
                  ]
                ],
                "tags": [
                  {
                    "key": "host",
                    "operator": "=~",
                    "value": "/^$server_ip$/"
                  }
                ]
              },
              {
                "datasource": {
                  "type": "influxdb",
                  "uid": "P951FEA4DE68E13C5"
                },
                "groupBy": [
                  {
                    "params": [
                      "$__interval"
                    ],
                    "type": "time"
                  },
                  {
                    "params": [
                      "null"
                    ],
                    "type": "fill"
                  }
                ],
                "hide": false,
                "measurement": "host:traffic",
                "orderByTime": "ASC",
                "policy": "default",
                "refId": "B",
                "resultFormat": "time_series",
                "select": [
                  [
                    {
                      "params": [
                        "bytes_sent"
                      ],
                      "type": "field"
                    },
                    {
                      "params": [],
                      "type": "mean"
                    }
                  ]
                ],
                "tags": [
                  {
                    "key": "host",
                    "operator": "=~",
                    "value": "/^$server_ip$/"
                  }
                ]
              }
            ],
            "title": "Total Traffic Send x Recive",
            "type": "timeseries"
          },
          {
            "datasource": {
              "type": "influxdb",
              "uid": "P951FEA4DE68E13C5"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "palette-classic"
                },
                "custom": {
                  "axisLabel": "",
                  "axisPlacement": "auto",
                  "barAlignment": 1,
                  "drawStyle": "line",
                  "fillOpacity": 10,
                  "gradientMode": "opacity",
                  "hideFrom": {
                    "legend": false,
                    "tooltip": false,
                    "viz": false
                  },
                  "lineInterpolation": "linear",
                  "lineStyle": {
                    "fill": "solid"
                  },
                  "lineWidth": 2,
                  "pointSize": 5,
                  "scaleDistribution": {
                    "type": "linear"
                  },
                  "showPoints": "auto",
                  "spanNulls": true,
                  "stacking": {
                    "group": "A",
                    "mode": "none"
                  },
                  "thresholdsStyle": {
                    "mode": "off"
                  }
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "red",
                      "value": 80
                    }
                  ]
                },
                "unit": "decbytes"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 12,
              "y": 0
            },
            "id": 23,
            "options": {
              "legend": {
                "calcs": [],
                "displayMode": "list",
                "placement": "bottom"
              },
              "tooltip": {
                "mode": "single",
                "sort": "none"
              }
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "datasource": {
                  "type": "influxdb",
                  "uid": "P951FEA4DE68E13C5"
                },
                "groupBy": [
                  {
                    "params": [
                      "$__interval"
                    ],
                    "type": "time"
                  },
                  {
                    "params": [
                      "null"
                    ],
                    "type": "fill"
                  }
                ],
                "measurement": "iface:traffic",
                "orderByTime": "ASC",
                "policy": "default",
                "refId": "A",
                "resultFormat": "time_series",
                "select": [
                  [
                    {
                      "params": [
                        "bytes"
                      ],
                      "type": "field"
                    },
                    {
                      "params": [],
                      "type": "mean"
                    }
                  ]
                ],
                "tags": []
              }
            ],
            "title": "Total Traffic",
            "type": "timeseries"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "red",
                      "value": 80
                    }
                  ]
                }
              },
              "overrides": []
            },
            "gridPos": {
              "h": 3,
              "w": 24,
              "x": 0,
              "y": 8
            },
            "id": 19,
            "options": {
              "colorMode": "value",
              "graphMode": "area",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "textMode": "auto"
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": ""
                },
                "itemTag": {
                  "filter": ""
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "2",
                "refId": "A",
                "resultFormat": "time_series",
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "textFilter": "System name",
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                },
                "useCaptureGroups": false
              }
            ],
            "title": "Server hostname",
            "type": "stat"
          },
          {
            "ackEventColor": "rgb(56, 219, 156)",
            "ackField": true,
            "ageField": false,
            "customLastChangeFormat": false,
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "descriptionAtNewLine": false,
            "descriptionField": true,
            "fontSize": "100%",
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 0,
              "y": 11
            },
            "highlightBackground": false,
            "highlightNewEvents": false,
            "highlightNewerThan": "1h",
            "hostField": true,
            "hostGroups": false,
            "hostProxy": false,
            "hostTechNameField": false,
            "id": 10,
            "lastChangeFormat": "",
            "layout": "table",
            "markAckEvents": false,
            "okEventColor": "rgb(56, 189, 113)",
            "pageSize": 10,
            "problemTimeline": true,
            "resizedColumns": [],
            "schemaVersion": 8,
            "severityField": true,
            "showTags": true,
            "sortProblems": "lastchange",
            "statusField": true,
            "statusIcon": false,
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": ""
                },
                "itemTag": {
                  "filter": ""
                },
                "options": {
                  "acknowledged": 2,
                  "disableDataAlignment": false,
                  "hostProxy": false,
                  "hostsInMaintenance": false,
                  "limit": 1001,
                  "minSeverity": 0,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "sortProblems": "default",
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "5",
                "refId": "A",
                "resultFormat": "time_series",
                "showProblems": "problems",
                "slaInterval": "none",
                "slaProperty": {
                  "name": "Status",
                  "property": "status"
                },
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 0
                }
              }
            ],
            "title": "Zabbix Error Panel",
            "triggerSeverity": [
              {
                "$$hashKey": "object:587",
                "color": "rgb(108, 108, 108)",
                "priority": 0,
                "severity": "Not classified",
                "show": true
              },
              {
                "$$hashKey": "object:588",
                "color": "rgb(120, 158, 183)",
                "priority": 1,
                "severity": "Information",
                "show": true
              },
              {
                "$$hashKey": "object:589",
                "color": "rgb(175, 180, 36)",
                "priority": 2,
                "severity": "Warning",
                "show": true
              },
              {
                "$$hashKey": "object:590",
                "color": "rgb(255, 137, 30)",
                "priority": 3,
                "severity": "Average",
                "show": true
              },
              {
                "$$hashKey": "object:591",
                "color": "rgb(255, 101, 72)",
                "priority": 4,
                "severity": "High",
                "show": true
              },
              {
                "$$hashKey": "object:592",
                "color": "rgb(215, 0, 0)",
                "priority": 5,
                "severity": "Disaster",
                "show": true
              }
            ],
            "type": "alexanderzobnin-zabbix-triggers-panel"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [
                  {
                    "options": {
                      "0": {
                        "color": "red",
                        "index": 1,
                        "text": "DOWN"
                      },
                      "1": {
                        "color": "super-light-green",
                        "index": 0,
                        "text": "UP"
                      }
                    },
                    "type": "value"
                  }
                ],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    }
                  ]
                }
              },
              "overrides": []
            },
            "gridPos": {
              "h": 4,
              "w": 6,
              "x": 12,
              "y": 11
            },
            "id": 6,
            "options": {
              "colorMode": "value",
              "graphMode": "none",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "textMode": "auto"
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "Zabbix server"
                },
                "item": {
                  "filter": "Zabbix agent ping"
                },
                "itemTag": {
                  "filter": "Application: Monitoring agent"
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "A",
                "resultFormat": "time_series",
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "Zabbix Agent Status",
            "type": "stat"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "palette-classic"
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    }
                  ]
                },
                "unit": "s"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 4,
              "w": 6,
              "x": 18,
              "y": 11
            },
            "id": 2,
            "options": {
              "colorMode": "value",
              "graphMode": "none",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "textMode": "auto"
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": "System uptime"
                },
                "itemTag": {
                  "filter": "Application: Status"
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "A",
                "resultFormat": "time_series",
                "slaInterval": "none",
                "slaProperty": {
                  "name": "SLA",
                  "property": "sla"
                },
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "OS - Uptime",
            "type": "stat"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "red",
                      "value": 80
                    }
                  ]
                }
              },
              "overrides": []
            },
            "gridPos": {
              "h": 4,
              "w": 6,
              "x": 12,
              "y": 15
            },
            "id": 15,
            "options": {
              "colorMode": "value",
              "graphMode": "area",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "textMode": "auto"
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": "Checksum of /etc/passwd"
                },
                "itemTag": {
                  "filter": "Application: Security"
                },
                "options": {
                  "acknowledged": 2,
                  "disableDataAlignment": false,
                  "hostProxy": false,
                  "hostsInMaintenance": false,
                  "limit": 1001,
                  "minSeverity": 0,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "sortProblems": "default",
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "A",
                "resultFormat": "time_series",
                "showProblems": "problems",
                "slaInterval": "none",
                "slaProperty": {
                  "name": "SLA",
                  "property": "sla"
                },
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "Cheksum Passwd",
            "type": "stat"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [],
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    }
                  ]
                }
              },
              "overrides": []
            },
            "gridPos": {
              "h": 4,
              "w": 6,
              "x": 18,
              "y": 15
            },
            "id": 14,
            "options": {
              "colorMode": "value",
              "graphMode": "none",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "textMode": "auto"
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": "Number of logged in users"
                },
                "itemTag": {
                  "filter": "Application: General"
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "A",
                "resultFormat": "time_series",
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "User Logged",
            "type": "stat"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [],
                "max": 100,
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "red",
                      "value": 80
                    }
                  ]
                },
                "unit": "percent"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 0,
              "y": 19
            },
            "id": 8,
            "options": {
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "showThresholdLabels": false,
              "showThresholdMarkers": true
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "hide": false,
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": "CPU utilization"
                },
                "itemTag": {
                  "filter": "Application: CPU"
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "B",
                "resultFormat": "time_series",
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "CPU - Load average",
            "type": "gauge"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "thresholds"
                },
                "mappings": [],
                "max": 100,
                "thresholds": {
                  "mode": "absolute",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "red",
                      "value": 80
                    }
                  ]
                },
                "unit": "percent"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 12,
              "y": 19
            },
            "id": 17,
            "options": {
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "",
                "values": false
              },
              "showThresholdLabels": false,
              "showThresholdMarkers": true
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "application": {
                  "filter": ""
                },
                "datasource": {
                  "type": "alexanderzobnin-zabbix-datasource",
                  "uid": "PA67C5EADE9207728"
                },
                "functions": [],
                "group": {
                  "filter": "Zabbix servers"
                },
                "host": {
                  "filter": "/^$server_hostname$/"
                },
                "item": {
                  "filter": "Memory utilization"
                },
                "itemTag": {
                  "filter": "Application: Memory"
                },
                "options": {
                  "disableDataAlignment": false,
                  "showDisabledItems": false,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": false
                },
                "proxy": {
                  "filter": ""
                },
                "queryType": "0",
                "refId": "A",
                "resultFormat": "time_series",
                "table": {
                  "skipEmptyValues": false
                },
                "tags": {
                  "filter": ""
                },
                "trigger": {
                  "filter": ""
                },
                "triggers": {
                  "acknowledged": 2,
                  "count": true,
                  "minSeverity": 3
                }
              }
            ],
            "title": "Memory - Available",
            "transformations": [],
            "type": "gauge"
          }
        ],
        "refresh": "5s",
        "schemaVersion": 36,
        "style": "dark",
        "tags": [],
        "templating": {
          "list": [
            {
              "hide": 2,
              "label": "Server IP",
              "name": "server_ip",
              "query": `${ip}`,
              "skipUrlSync": false,
              "type": "constant"
            },
            {
              "hide": 2,
              "label": "Server Hostname",
              "name": "server_hostname",
              "query": `${host}`,
              "skipUrlSync": false,
              "type": "constant"
            },
            {
              "current": {
                "selected": false,
                "text": "All",
                "value": "$__all"
              },
              "datasource": {
                "type": "alexanderzobnin-zabbix-datasource",
                "uid": "PA67C5EADE9207728"
              },
              "definition": "Zabbix - item",
              "hide": 0,
              "includeAll": true,
              "label": "Network interface",
              "multi": true,
              "name": "netif",
              "options": [],
              "query": {
                "application": "",
                "group": "Zabbix Servers",
                "host": "/^$server_hostname$/",
                "item": "/.*/",
                "itemTag": "",
                "queryType": "item"
              },
              "refresh": 1,
              "regex": "/(?:Incoming|Outgoing) network traffic on (.*)/",
              "skipUrlSync": false,
              "sort": 0,
              "type": "query"
            }
          ]
        },
        "time": {
          "from": "now-6h",
          "to": "now"
        },
        "timepicker": {},
        "timezone": "",
        "title": `${name}`,
        "version": 6,
        "weekStart": ""
      }
    };
    return dashboard;
  },
};
