module.exports = {

    instanceDashboard(name, host) {
        const dashboard = {
            "Dashboard": {
                "annotations": {
                    "list": [
                        {
                            "builtIn": 1,
                            "datasource": "-- Grafana --",
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
                "gnetId": null,
                "graphTooltip": 0,
                "id": null,
                "links": [],
                "liveNow": false,
                "panels": [
                    {
                        "datasource": null,
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
                                "fields": "",
                                "values": false
                            },
                            "textMode": "auto"
                        },
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
                                },
                                "item": {
                                    "filter": "Host name"
                                },
                                "itemTag": {
                                    "filter": "Application: OS"
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
                        "title": "Server hostname",
                        "type": "stat"
                    },
                    {
                        "ackEventColor": "rgb(56, 219, 156)",
                        "ackField": true,
                        "ageField": false,
                        "customLastChangeFormat": false,
                        "datasource": null,
                        "descriptionAtNewLine": false,
                        "descriptionField": true,
                        "fontSize": "100%",
                        "gridPos": {
                            "h": 8,
                            "w": 12,
                            "x": 0,
                            "y": 3
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
                        "limit": null,
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
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
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
                        "datasource": null,
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
                            "y": 3
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
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
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
                        "datasource": null,
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
                            "y": 3
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
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Zabbix servers"
                                },
                                "host": {
                                    "filter": "Zabbix server"
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
                        "datasource": null,
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
                            "y": 7
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
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
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
                        "title": "Cheksum Passwd",
                        "type": "stat"
                    },
                    {
                        "datasource": null,
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
                            "y": 7
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
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
                                },
                                "item": {
                                    "filter": "Number of logged in users"
                                },
                                "itemTag": {
                                    "filter": "Application: OS"
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
                        "datasource": null,
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
                                    "fillOpacity": 0,
                                    "gradientMode": "none",
                                    "hideFrom": {
                                        "legend": false,
                                        "tooltip": false,
                                        "viz": false
                                    },
                                    "lineInterpolation": "linear",
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
                                "unit": "ms"
                            },
                            "overrides": []
                        },
                        "gridPos": {
                            "h": 8,
                            "w": 12,
                            "x": 0,
                            "y": 11
                        },
                        "id": 8,
                        "options": {
                            "legend": {
                                "calcs": [
                                    "last"
                                ],
                                "displayMode": "list",
                                "placement": "bottom"
                            },
                            "tooltip": {
                                "mode": "single"
                            }
                        },
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
                                },
                                "item": {
                                    "filter": "Processor load (1 min average per core)"
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
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "hide": false,
                                "host": {
                                    "filter": `${host}`
                                },
                                "item": {
                                    "filter": "Processor load (5 min average per core)"
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
                        "type": "timeseries"
                    },
                    {
                        "datasource": null,
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
                                },
                                "unit": "decbytes"
                            },
                            "overrides": []
                        },
                        "gridPos": {
                            "h": 8,
                            "w": 12,
                            "x": 12,
                            "y": 11
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
                        "pluginVersion": "8.3.0-pre",
                        "targets": [
                            {
                                "application": {
                                    "filter": ""
                                },
                                "datasource": "Zabbix",
                                "functions": [],
                                "group": {
                                    "filter": "Linux servers"
                                },
                                "host": {
                                    "filter": `${host}`
                                },
                                "item": {
                                    "filter": "Total memory"
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
                        "type": "gauge"
                    }
                ],
                "refresh": "5s",
                "schemaVersion": 31,
                "style": "dark",
                "tags": [],
                "templating": {
                    "list": []
                },
                "time": {
                    "from": "now-6h",
                    "to": "now"
                },
                "timepicker": {},
                "timezone": "",
                "title": `${name}`,
                "uid": null,
                "version": 1,
                "weekStart": ""
            }
        }

        return dashboard;
    }
}