**附录：参考文档**

* 官方：

    https://kubernetes.io/docs/concepts/scheduling/kube-scheduler/


**1.调度流程**


![调度流程](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/21.%E8%B0%83%E5%BA%A6%E5%99%A8%E4%B8%8E%E8%B0%83%E5%BA%A6%E6%9C%BA%E5%88%B6/k8s-scheduler.png)



如图所示，调度流程分为两大块：

* Filtering
        
  预选阶段，也称为predicate。会按照预选过滤器，首先把不符合要求的node节点直接剔除在外。
  
  所有过滤器：https://github.com/kubernetes/kubernetes/tree/master/pkg/scheduler/algorithm/predicates
  
  
1) Filtering：Pod Affinity

      Pod之间的亲和性，表示是否愿意调度在一个区域（可以是node、机架、也可以是机房）


* Scoring

  打分阶段，也称为priority（优选阶段，哪个更优），通过优选函数对节点进行打分，从而决定调度策略。
  
  所有过滤器：https://github.com/kubernetes/kubernetes/tree/master/pkg/scheduler/algorithm/priorities


1) Scoring：NodeAffinityPriority

    pod对node的亲和性，表示是否愿意调度到某个node上，其细分为以下两个类型：

    硬亲和(required)：requiredDuringSchedulingIgnoredDuringExecution
        
        如果条件都不满足，则不调度,Pod对象的状态会一直是Pending状态
    软亲和(preferred)：preferredDuringSchedulingIgnoredDuringExecution

        如果条件都不满足，也会从中按照打分，“勉为其难”的选择一个进行调度

**2.相关命令**
```bash
[root@centos-1 chapter12]# kubectl explain pod.spec.affinity
KIND:     Pod
VERSION:  v1

RESOURCE: affinity <Object>

DESCRIPTION:
     If specified, the pod's scheduling constraints

     Affinity is a group of affinity scheduling rules.

FIELDS:
   nodeAffinity	<Object>
     Describes node affinity scheduling rules for the pod.

   podAffinity	<Object>
     Describes pod affinity scheduling rules (e.g. co-locate this pod in the
     same node, zone, etc. as some other pod(s)).

   podAntiAffinity	<Object>
     Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod
     in the same node, zone, etc. as some other pod(s)).
```

**3.实际配置**

可参考本页相关yaml文件，仅供参考

请注意：

* key级别，是与关系（and）
* matchExpressions级别是或关系（or）
