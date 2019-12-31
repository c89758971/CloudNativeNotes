**Job控制器**

应用场景：一次性任务，任务完成时的状态为Completed（见下图），常用作备份操作
```bash
[root@centos-1 mainfasts]# kubectl get pod
NAME                     READY   STATUS              RESTARTS   AGE
job-demo-68tzh           0/1     Completed           0          29s
job-demo-kxdd8           0/1     Completed           0          29s
job-demo-nmpsn           1/1     Running             0          9s
job-demo-wshn4           0/1     ContainerCreating   0          0s
ngx-new-cb79d555-gqwf8   1/1     Running             0          33h
ngx-new-cb79d555-hcdr9   1/1     Running             0          33h
```

**1.命令说明**
```bash
restartPolicy: 
    “OnFailure”  #失败就重启
    "Never"     #就算失败，也不重启
```

**2.demo**

1) 单任务串行
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  template:
    metadata:
      labels:
        app: myjob
    spec:
      containers:
      - name: myjob
        image: alphine
        command: ["/bin/sh", "-c", "sleep 10"]
      restartPolicy: Never                     #重启策略-never，就算失败，也不重启
```

2) 多任务并行
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  completions: 5       #任务总量
  parallelism: 2       #并发量
  template:
    metadata:
      labels:
        app: myjob
    spec:
      containers:
      - name: myjob
        image: nginx
        command: ["/bin/sh", "-c", "sleep 10"]
      restartPolicy: Never                      #重启策略-never，就算失败，也不重启
```