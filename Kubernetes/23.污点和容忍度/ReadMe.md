# Taints and Tolerations（污点和容忍度）

Taint（污点）和Toleration（容忍）可以作用于node和pod上，其目的是优化pod在集群间的调度，这跟节点亲和性类似，
只不过它们作用的方式相反，用作确保pod不会被调度在指定的节点上
 
- 概念引入
- Taints Effect


### 概念引入 

![taints](https://github.com/Aaron1989/CloudNativeNotes/blob/master/Kubernetes/23.%E6%B1%A1%E7%82%B9%E5%92%8C%E5%AE%B9%E5%BF%8D%E5%BA%A6/taintsandtolerations.png)


如图所示，node节点上分别有云、五角星、十字架这三个污点；Pod-A上有云和五角星的污点容忍度，Pod—B上则没有
容忍度。

调度结果：
```text
Pod-A：调度至node-1和node-3
Pod-B: 只会调度至node-3
```
 
###  Taints Effect

表头  | 表头  | 表头
---- | ----- | ------ 
单元格内容  | 单元格内容 | 单元格内容
单元格内容  | 单元格内容 | 单元格内容 



 
 
 
 
 
 
### 附录：参考文档

* 官方文档：

    https://v1-16.docs.kubernetes.io/docs/concepts/configuration/taint-and-toleration/
    
