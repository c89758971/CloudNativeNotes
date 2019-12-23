**1.相关文档资料**

* 官网：
    
    https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/
 
* 查询命令
    ```bash
    kubectl explain sts
    ```    
    
* 说明
    
    statefulset直接用的比较少，而是根据需求，直接去用对应的operator控制器（没有打包在controller-manager中，
    需要应用时，自行安装集成）
     
    GitHub：https://github.com/operator-framework/awesome-operators

**2.金丝雀发布实现**

1) 具体金丝雀发布流程如下图所示

![金丝雀发布](https://github-aaron89.oss-cn-beijing.aliyuncs.com/Kubernetes/sts-canarydeploy.png)



2) 说明：

* statefulset资源是按序生成、命名规律，且逆序更新
* partition参数：指定需要分区的数量。如图所示：

    当partition=3时，表示将Pod web-0、Pod web-1、Pod web-2视为1个分区，新版本只会更新Pod web-3和Pod web-4
    
    当partition=0时，发布策略将会把剩余的Pod也都发布成新版本

* partition资源申明帮助
    ```bash
    kubectl explain sts.spec.updateStrategy.rollingUpdate.partition
    ```
