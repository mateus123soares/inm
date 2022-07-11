module.exports = {

  instanceDashboard(name, host, ip, interface) {
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
        "links": [],
        "liveNow": false,
        "panels": [
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
              "y": 0
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
                "fields": "/^System name$/",
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
                  "filter": "System name"
                },
                "itemTag": {
                  "filter": "Application: General"
                },
                "options": {
                  "disableDataAlignment": true,
                  "showDisabledItems": true,
                  "skipEmptyValues": false,
                  "useZabbixValueMapping": true
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
                "textFilter": "",
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
            "transformations": [],
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
                "custom": {
                  "axisLabel": "",
                  "axisPlacement": "auto",
                  "barAlignment": 0,
                  "drawStyle": "line",
                  "fillOpacity": 30,
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
                  "lineWidth": 1,
                  "pointSize": 5,
                  "scaleDistribution": {
                    "type": "linear"
                  },
                  "showPoints": "auto",
                  "spanNulls": false,
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
                "unit": "Kbits"
              },
              "overrides": []
            },
            "gridPos": {
              "h": 8,
              "w": 24,
              "x": 0,
              "y": 3
            },
            "id": 35,
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
                "sort": "none"
              }
            },
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
                  "filter": `Interface ${interface}: Bits received`
                },
                "itemTag": {
                  "filter": `Application: Interface ${interface}`
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
              },
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
                  "filter": `Interface ${interface}: Bits sent`
                },
                "itemTag": {
                  "filter": `Application: Interface ${interface}`
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
            "title": "Total traffic interface",
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
                  "mode": "thresholds"
                },
                "custom": {
                  "align": "auto",
                  "displayMode": "color-text",
                  "filterable": true,
                  "inspect": false
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
              "w": 24,
              "x": 0,
              "y": 11
            },
            "id": 33,
            "options": {
              "footer": {
                "enablePagination": true,
                "fields": "",
                "reducer": [
                  "sum"
                ],
                "show": false
              },
              "showHeader": true,
              "sortBy": [
                {
                  "desc": true,
                  "displayName": "Time"
                }
              ]
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "alias": "",
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
                  }
                ],
                "measurement": "host:ndpi_flows",
                "orderByTime": "ASC",
                "policy": "default",
                "query": "SELECT \"time\",\"host\",\"protocol\",\"num_flows\" FROM \"host:ndpi_flows\"  WHERE $timeFilter AND (\"host\" =~ /^$server_ip$/)",
                "rawQuery": true,
                "refId": "A",
                "resultFormat": "logs",
                "select": [
                  [
                    {
                      "params": [
                        "num_flows"
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
            "title": "Protocol peer host",
            "type": "table"
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
              "y": 19
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
              "h": 5,
              "w": 3,
              "x": 12,
              "y": 19
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
              "h": 5,
              "w": 3,
              "x": 15,
              "y": 19
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
              "h": 5,
              "w": 6,
              "x": 18,
              "y": 19
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
                "noValue": "No changes",
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
              "w": 12,
              "x": 12,
              "y": 24
            },
            "id": 31,
            "options": {
              "colorMode": "value",
              "graphMode": "area",
              "justifyMode": "auto",
              "orientation": "auto",
              "reduceOptions": {
                "calcs": [
                  "lastNotNull"
                ],
                "fields": "/^Checksum of /etc/passwd$/",
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
            "title": "Checksum Passwd",
            "type": "stat"
          },
          {
            "datasource": {
              "type": "influxdb",
              "uid": "6BuIPUr7z"
            },
            "fieldConfig": {
              "defaults": {
                "custom": {
                  "align": "auto",
                  "displayMode": "color-text",
                  "filterable": true,
                  "inspect": true
                },
                "mappings": [],
                "noValue": "No more logs",
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
              "h": 7,
              "w": 24,
              "x": 0,
              "y": 27
            },
            "id": 27,
            "options": {
              "footer": {
                "enablePagination": true,
                "fields": "",
                "reducer": [
                  "sum"
                ],
                "show": false
              },
              "showHeader": true,
              "sortBy": [
                {
                  "desc": true,
                  "displayName": "ufw_interface"
                }
              ]
            },
            "pluginVersion": "9.0.0-pre",
            "targets": [
              {
                "datasource": {
                  "type": "influxdb",
                  "uid": "6BuIPUr7z"
                },
                "groupBy": [],
                "measurement": "ufw_log",
                "orderByTime": "ASC",
                "policy": "default",
                "refId": "A",
                "resultFormat": "logs",
                "select": [
                  [
                    {
                      "params": [
                        "*"
                      ],
                      "type": "field"
                    }
                  ]
                ],
                "tags": [
                  {
                    "key": "host",
                    "operator": "=",
                    "value": "mateus-HP-240-G4-Notebook-PC"
                  }
                ]
              }
            ],
            "title": "Logs UFW Firewall",
            "type": "table"
          },
          {
            "datasource": {
              "type": "influxdb",
              "uid": "6BuIPUr7z"
            },
            "fieldConfig": {
              "defaults": {
                "color": {
                  "mode": "palette-classic"
                },
                "custom": {
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
                  "pointSize": 5,
                  "scaleDistribution": {
                    "type": "linear"
                  },
                  "showPoints": "auto",
                  "spanNulls": false,
                  "stacking": {
                    "group": "A",
                    "mode": "none"
                  },
                  "thresholdsStyle": {
                    "mode": "off"
                  }
                },
                "mappings": [],
                "noValue": "No actions",
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
              "h": 7,
              "w": 24,
              "x": 0,
              "y": 34
            },
            "id": 29,
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
                  "uid": "6BuIPUr7z"
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
                "measurement": "ufw_log",
                "orderByTime": "ASC",
                "policy": "default",
                "refId": "A",
                "resultFormat": "time_series",
                "select": [
                  [
                    {
                      "params": [
                        "ufw_action"
                      ],
                      "type": "field"
                    },
                    {
                      "params": [],
                      "type": "count"
                    }
                  ]
                ],
                "tags": []
              }
            ],
            "title": "Total Action Firewall Block",
            "type": "timeseries"
          },
          {
            "datasource": {
              "type": "alexanderzobnin-zabbix-datasource",
              "uid": "PA67C5EADE9207728"
            },
            "fieldConfig": {
              "defaults": {
                "custom": {
                  "align": "auto",
                  "displayMode": "color-text",
                  "inspect": false
                },
                "mappings": [],
                "noValue": "No software installed",
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
              "w": 24,
              "x": 0,
              "y": 41
            },
            "id": 25,
            "options": {
              "footer": {
                "fields": "",
                "reducer": [
                  "sum"
                ],
                "show": false
              },
              "showHeader": true
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
                  "filter": "Software installed"
                },
                "itemTag": {
                  "filter": "Application: Inventory"
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
            "title": "Softwares Instaled",
            "type": "table"
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
                  "mode": "percentage",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "#EAB839",
                      "value": 80
                    },
                    {
                      "color": "red",
                      "value": 90
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
              "y": 45
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
                  "mode": "percentage",
                  "steps": [
                    {
                      "color": "green",
                      "value": null
                    },
                    {
                      "color": "#EAB839",
                      "value": 80
                    },
                    {
                      "color": "red",
                      "value": 90
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
              "y": 45
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
        "weekStart": ""
      }
    };
    return dashboard;
  },
};
