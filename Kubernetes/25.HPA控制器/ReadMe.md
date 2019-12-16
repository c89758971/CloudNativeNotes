# Horizontal Pod Autoscaler（HPA控制器）

应用的资源使用率通常都有高峰和低谷的时候，如何削峰填谷，如何提高集群的整体资源利用率，如何让
service中的Pod个数自动调整呢？
这就有赖于Horizontal Pod Autoscaling（HPA控制器）了！

- 自动伸缩
- HPA简介
- HPA组件交互图
- Before you begin


### 自动伸缩

自动伸缩分为两种：水平伸缩和垂直伸缩。

- 水平伸缩：
    ```text
    K8S基础资源级别的水平伸缩：
        HPA（Horizontal Pod Autoscaling）：
            autoscaling/v1：仅支持cpu采样
            autoscaling/v2beta1：额外增加支持custom metrics（kubernetes1.6+）
            autoscaling/v2beta2：额外增加支持external metrics，multiple metrics和metrics APIs（kubernetes1.6）
    ```
    ```text
    K8S集群级别的水平伸缩：
        CA（Cluster Autoscaler）：通过集成云计算的相关资源申请接口，达到集群级别的动态弹性伸缩效果。
    
    ```

- [垂直伸缩](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/autoscaling/vertical-pod-autoscaler.md)
    ```text
        VPA（Vertical Pod AutoScaler）-垂直伸缩：提升单个Pod的request处理能力（还不成熟）
        AR（Addon Resizer：垂直伸缩工具）：根据实际状态，弹性调整pod的request和limit
    
    ```    

### HPA简介

根据对应的autoscaling/API版本，HPA可以获得监控指标并结合replication controller, deployment, replica set 
或者 stateful set自动扩展Pod，需要注意的是DaemonSets对象是不支持的。


### HPA组件交互图

用户可以通过CMD，显示申明一个HPA控制器,然后HPA控制器根据指标自动调整RS/Deployment控制器指标，从而
达到自动扩缩容Pod的效果。
```bash
kubectl autoscale deployment foo --min=2 --max=5 --cpu-percent=80

```

### Before you begin
使用前，需要make sure以下几点：

- K8S集群version 1.2 or later
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server)/[Prometheus](https://github.com/coreos/prometheus-operator)



### 附录：参考文档

* 官方文档：

    https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

    https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/
    

* jimmysong.io：

    https://jimmysong.io/kubernetes-handbook/concepts/horizontal-pod-autoscaling.html